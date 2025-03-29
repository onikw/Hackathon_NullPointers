let data = {}

const test = (req, res) => {


    const {spawn} = require('child_process');

    const args = ['1', '2', '3'];


    const pythonProcess = spawn('python3', ['-m', 'script', ...args]);


    pythonProcess.stdout.on('data', (data) => {


        console.log(`Odpowiedź z Pythona: ${data}`);


    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Błąd Pythona: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Proces zakończył się kodem: ${code}`);
    });


    console.log(data)


    res.send('Hello World!')
}

const downloadData = (req, res) => {
    data = req.body
    console.log(data)
    let result = '';
    let responseSent = false;

    const {spawn} = require('child_process');
    const args = JSON.stringify(data);
    const pythonProcess = spawn('python3', ['-m', 'script', args]);

    // Zbieramy wszystkie fragmenty danych
    pythonProcess.stdout.on('data', (data) => {
        console.log('Otrzymano dane z Pythona')
        result += data.toString();
        console.log(`Fragment odpowiedzi: ${data}`);
    });

    // Obsługa błędów
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Błąd Pythona: ${data}`);
    });

    // Wysyłamy odpowiedź dopiero po zakończeniu procesu
    pythonProcess.on('close', (code) => {
        console.log(`Proces zakończył się kodem: ${code}`);
        if (!responseSent) {
            responseSent = true;
            res.status(200).json({message: 'Data downloaded', data: result});
        }
    });

    // Obsługa błędów procesu
    pythonProcess.on('error', (error) => {
        console.error(`Błąd procesu: ${error}`);
        if (!responseSent) {
            responseSent = true;
            res.status(500).json({message: 'Error processing data'});
        }
    });
}

module.exports = {
    test,
    downloadData
}