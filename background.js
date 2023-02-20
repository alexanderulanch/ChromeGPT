import { WordTokenizer, WordNetLemmatizer } from "natural";
import "core-js/stable";

function preprocessContent(content) {
  const $ = cheerio.load(content);
  $("header, footer, nav").remove();

  const text = $.text();

  const tokenizer = new WordTokenizer();
  const tokens = tokenizer.tokenize(text);

  const lemmatizer = new WordNetLemmatizer();
  const lemmas = tokens.map((token) => lemmatizer.lemmatize(token));

  const preprocessedContent = lemmas.join(" ");

  const truncatedText = preprocessedContent.substring(0, maxLength);

  console.log(truncatedText);

  return truncatedText;
}

chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const title = document.title;
        const content = document.body.innerHTML;
        return { title, content };
      },
    },
    (results) => {
      const { title, content } = results[0];
      const preprocessedContent = preprocessContent(content);
      const question = prompt("Enter a question to ask about this webpage:");
      generateQuestion(question, title + "\n" + preprocessedContent);
    }
  );
});
