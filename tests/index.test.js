const axios = require("axios");

// const BACKEND_URL = "http://localhost:3000"

// describe("Authentication", ()=> {
//     test('User is able to singup only once', async()=>{
//         const username = "Kirat" + Math.random();
//         const password = "123456";
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin"
//         })
//         expect(response.statusCode).toBe(200)
//         const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin"
//         })

//         expect(updatedResponse.statusCode).toBe(400);
//     });

//     test('Signup request fails if the username is empty', async()=> {
//         const username = `kirat-${Math.random()}`
//         const password = "123456"

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             password
//         })
//         expect(response.statusCode).toBe(400)
//     })

//     test('Signup succeeds if the username and password are correct', async() =>{
//         const username = `Kirat-${Math.random()}`
//         const password = "123456"

//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password
//         });

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password
//         });

//         expect(response.statusCode).toBe(200)
//         expect(response.body.token).toBeDefined()
//     })

//     test('Signin fails if the username and password are incorrect', async()=>{
//         const username = `Kirat-${Math.random()}`
//         const password = "123456"

//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, 
//             password
//         });

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username: "WrongUsername",
//             password
//         })

//         expect(response.statusCode).toBe(403) //status code for unauthorized. -> when failed
//     })
// })

describe("User Information endpoints", ()=> {
    let token ="";
    beforeAll(async()=>{
        const username = "Kirat" + Math.random();
        const password = "123456";

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        });

        const respone = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })
        token = response.data.token
        
        const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
            "name": "Timmy"
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        console.log("avatarresponse is " + avatarResponse.data.avatarId)

        avatarId = avatarResponse.data.avatarId;
    })

    test("user can't update their metadata with a wrong avatar id", async()=>{
        const respone = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
            avatarId: "1234567890"
        }, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })

        expect(response.statusCode).toBe(400)
    })

    test("user can update their metadata with the right avatar id", ()=>{
        expect(1).toBe(1)
    })
    test("test 3", ()=>{
        expect(1).toBe(1)
    })

})