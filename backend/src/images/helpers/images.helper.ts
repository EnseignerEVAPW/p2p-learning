/* eslint-disable prettier/prettier */
export const renameImage = (req, file, callback) =>{
    const name= file.originalname.split('.')[0];
    const fileName =file.originalname;
    const randomName = Array(4)
    .fill(null)
    .map(()=> Math.round(Math.random()*16).toString(16))
    .join('');

    callback(null, `${name}-${randomName}${fileName}`);
}

export const fileFilter = (req, file, callback)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return callback(new Error('No es posible que no sea imagen'), false)
    }
    callback(null, true)
}