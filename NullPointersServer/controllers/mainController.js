let data = {}

const test = (req, res) => {
    res.send('Hello World!')
}

const downloadData = (req, res) =>{
    data = req.body
    console.log(data)
    res.status(200).json({message: 'Data downloaded'})
}



module.exports = {
    test,
    downloadData
}