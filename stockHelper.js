/**
 * Gets the processing page
 * @param {array} data
 */
function getProcessingPage(data) {
  return processData(data);
}

/**
 *
 * @returns {Promise<any>}
 */
function processWaiting() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve("processing done.");
    }, 2000);
  });
}

/**
 *
 * @param data
 * @param index
 * @returns {Promise<Promise<*|*|*|*|*|boolean>|{title: string, message: null}|boolean|{title: string, message: string}>}
 */
async function processData(data, index) {
  if (!index) {
    index = 0;
  }

  switch (data[index].state) {
    case "processing":
      await processWaiting();

      return processData(data, index + 1);

    case "error":
      switch (data[index].errorCode) {
        case "NO_STOCK":
          return { title: "Error page", message: "No stock has been found" };
        case "INCORRECT_DETAILS":
          return {
            title: "Error page",
            message: "Incorrect details have been entered",
          };
        default:
          return { title: "Error page", message: null };
      }

    case "success":
      return { title: "Order complete", message: null };

    default:
      return false;
  }
}
