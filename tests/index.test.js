const axios = require("axios");

const BACKEND_URL = "http://localhost:3000"

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

    test("User can update their metadata with the right avatar id", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        expect(response.status).toBe(200)
    })

    test("User is not able to update their metadata if the auth header is not present", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId
        })

        expect(response.status).toBe(403)
    })

    test("test 3", () => {
        
    })

})


describe("User metadata endpoint", ()=>{});

describe("User avatar information", ()=>{
    let avatarId;
    let token;
    let userId;
    beforeAll(async()=>{
        const username = "Kirat" + Math.random();
        const password = "123456";

        const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        });

        userId=signupResponse.data.userId

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
    test("Get back avatar information for a user", async()=>{
        const response= await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`);
        expect(response.data.avatars.length).toBe(1);
        expect(response.data.avatars[0].userId).toBe(userId);
    })
    test("available avatar lists the recently created avatar", async()=>{
        const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`);
        expect(response.data.avatars.length).not.toBe(0);
        const currentAvatar = response.data.avatars.find(x => x.id == avatarId);
        expect(currentAvatar).toBeDefined()
    })
})

describe("Space information", ()=>{
    let mapId;
    let element1Id;
    let element2Id;
    let adminToken;
    let adminId;
    let userToken;
    let userId;

    beforeAll(async () => {
        const username = `kirat-${Math.random()}`
        const password = "123456"
 
        const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
         username,
         password,
         type: "admin"
        });

        adminId = signupResponse.data.userId
 
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
         username,
         password
        })
 
        adminToken = response.data.token

        const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username: username + "-user",
            password,
            type: "user"
        });
   
        userId = userSignupResponse.data.userId
    
        const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username: username + "-user",
            password
        })
    
        userToken = userSigninResponse.data.token

        const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
          "static": true
        }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        });

        const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
          "static": true
        }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        })
        element1Id = element1Response.data.id
        element2Id = element2Response.data.id
        console.log(element2Id)
        console.log(element1Id)
        const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
            "thumbnail": "https://thumbnail.com/a.png",
            "dimensions": "100x200",
            "name": "Test space",
            "defaultElements": [{
                    elementId: element1Id,
                    x: 20,
                    y: 20
                }, {
                  elementId: element1Id,
                    x: 18,
                    y: 20
                }, {
                  elementId: element2Id,
                    x: 19,
                    y: 20
                }
            ]
         }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
         })
         console.log("mapResponse.status")
         console.log(mapResponse.data.id)

         mapId = mapResponse.data.id;
        }
    );
    test("User is able to create a space", async () => {

        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
          "name": "Test",
          "dimensions": "100x200",
          "mapId": mapId
       }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
       })
       expect(response.status).toBe(200)
       expect(response.data.spaceId).toBeDefined()
    })

    test("User is able to create a space without mapId (empty space)", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
          "name": "Test",
          "dimensions": "100x200",
       }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
       })

       expect(response.data.spaceId).toBeDefined()
    })

    test("User is not able to create a space without mapId and dimensions", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
          "name": "Test",
       }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
       })

       expect(response.status).toBe(400)
    })
    test("User is not able to delete a space that doesnt exist", async () => {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/space/randomIdDoesntExist`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

       expect(response.status).toBe(400)
    })

    test("User is able to delete a space that does exist", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimensions": "100x200",
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        const deleteReponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

       expect(deleteReponse.status).toBe(200)
    })
    test("User should not be able to delete a space created by another user", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimensions": "100x200",
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        const deleteReponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        })

       expect(deleteReponse.status).toBe(403)
    })

    test("Admin has no spaces initially", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        });
        expect(response.data.spaces.length).toBe(0)
    })

    test("Admin has gets once space after", async () => {
        const spaceCreateReponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimensions": "100x200",
        }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        });
        console.log('jhflksdjflksdfjlksdfj')
        console.log(spaceCreateReponse.data)
        const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        });
        const filteredSpace = response.data.spaces.find(x => x.id == spaceCreateReponse.data.spaceId)
        expect(response.data.spaces.length).toBe(1)
        expect(filteredSpace).toBeDefined()

    })

        
})
