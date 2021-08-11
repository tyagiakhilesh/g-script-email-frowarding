function processEmailsForJobApplicatrions() {
  let ss = SpreadsheetApp.openByUrl(
    /** Correct this URL. Below is only a sample **/
    'https://docs.google.com/spreadsheets/d/XVNWUo-zCDbukyAQ098/edit');

  let sheet = ss.getSheets()[0];
  let data = sheet.getDataRange().getValues();

  for (let k = 0; k < data.length; k++) {
    console.log("Filter value is: ", data[k][0]);
    console.log("Forward Address is: ", data[k][1]);
    processMailsForGivenQuery(data[k][0], data[k][1]);
  }
}

function processMailsForGivenQuery(query, forwardAddress) {
  let start = 0;
  let max = 10;
  let threads;
  do {
    try {
      threads = GmailApp.search(query, start, max);
      start = max + start;

      for (let i = 0; i < threads.length; i++) {
        let thread = threads[i];
        let firstMessageSubject = thread.getFirstMessageSubject();
        console.log("First message of thread is: ", firstMessageSubject);
        let message = thread.getMessages()[0];
        try {
        message.forward(forwardAddress);
        } catch (t) {
          //ignoring for now
        }
        message.markRead();
      }
    } catch (e) {
      //ignoring for now
    }

  } while (threads.length > 0);
}
