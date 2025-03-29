let data = {}

const test = (req, res) => {


    const { spawn } = require('child_process');

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
    res.status(200).json({ message: 'Data downloaded' })



    const { spawn } = require('child_process');


    const args = Object.entries(data).flatMap(([key, value]) => [key, value]);


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







}



module.exports = {
    test,
    downloadData
}