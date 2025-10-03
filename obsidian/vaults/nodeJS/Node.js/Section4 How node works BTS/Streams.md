[[Section4]]

#Streams used to process read/write data piece by piece (chunks), without completing the whole read or write operation, and therefore without keeping all the data in memory. 

e.g. #YouTube #Netflix

Most of the time we consume data streams rather than building them in our applications.



| ==Streams are instances of the *EventEmitter* class== | Description                                                   | Example                                                                                                             | Important Events | Important Funcitons |
| ----------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| Readable Streams                                      | Stream from which can read/consume data.                      | http requests and fs read streams                                                                                   | data end         | pipe() read()       |
| Writable Streams                                      | Streams to which we can write data.                           | http responses and fs write streams                                                                                 | drain finish     | write() end()       |
| Duplex Streams                                        | Streams that are both readable and writeable                  | net web socket *(communication channel between client and server that remains open once connection is established)* |                  |                     |
| Transform Streams                                     | Duplex streams that transforms data as it  is written or read | zlib Gzip creation                                                                                                  |                  |                     |

Sometimes Readable stream from disk is much much faster than the speed of us sending it via response making Back Pressure to fix it use `readableSource.pipe(writeableDest)`
