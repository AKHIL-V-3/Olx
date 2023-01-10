import React, { useEffect, useState, useContext } from 'react';
import Header from '../Header/Header';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';
import './AdminHome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { db } from '../../Store/Firebase';
import { collection, getDocs, deleteDoc, doc, addDoc, setDoc, query, where } from 'firebase/firestore'
import { IdContext } from '../../Store/Idcontext';


function AdminHome() {

    const [search, setSearch] = useState([])
    const [userdata, setUserdata] = useState([]);
    const navigate = useHistory();

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(userdata.filter(user => {

            if (user.username.toLowerCase().includes(value.toLowerCase())) {
                return user
            }

            // user.username.toLowerCase().includes(value.toLowerCase())
        }))

    }

    const deleteUser = async (id) => {


        console.log(id, 'iddidididididdddddddddddddddddd');

        await deleteDoc(doc(db, "user", id)).then(() => {

            // window.location.reload(true)
        })





        // const q = query(collection(db, "user"), where("id", "==", id));
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach(async (user) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(user.id, " => ", user.data())

        //     await deleteDoc(doc(db, "user", user.id)).then(() => {

        //         window.location.reload(true)
        //     })

        // });
    }

    useEffect(async () => {

        const querySnapshot = await getDocs(collection(db, "user"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            setUserdata((prev) => {
                return [...prev, { ...doc.data(), id: doc.id }];
            });

            setSearch((prev) => {
                return [...prev, { ...doc.data(), id: doc.id }];
            });

        });


    }, []);

    const updateUserData = async ({ name, email, phone, id }) => {

        await setDoc(doc(db, "user", id), {
            username: name,
            email: email,
            phone: phone,
            id: id
        });

        window.location.reload(true)

        console.log(name, email, phone, id)

    }

    const [autoFillData, setAutoFillData] = useState({ name: 'User', email: 'abc@123.com', phone: "8889990000", id: '' });

    return (
        <div>

            <div className="headerParentDiv">
                <div className="headerChildDiv">
                    <div className="brandName">
                        <OlxLogo></OlxLogo>
                    </div>

                    <div className="productSearch">
                        <div className="input">
                            <input
                                type="text"
                                placeholder="Find user"
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="searchAction">
                            <Search color="#ffffff"></Search>
                        </div>
                    </div>


                    <div className='ChildDiv'>

                    </div>

                </div>
            </div>

            <div className='adminHome'>
                <div>
                    <h1>admin Home</h1>
                </div>

                <div className='userlist'>

                    <div className='table__head'>
                        <button className='adduser' onClick={(e) => {

                            navigate.push('/createuser')


                        }}>Add User</button>


                        <h2>User Table</h2>


                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Manage</th>

                            </tr>
                        </thead>
                        <tbody>

                            {search.map((user, index) => {


                                return (

                                    <tr >
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={(e) => {
                                                setAutoFillData({
                                                    name: user.username,
                                                    email: user.email,
                                                    phone: user.phone,
                                                    id: user.id
                                                })
                                                // editUser(user.id);
                                            }} className='btn btn-success me-4' type="button" data-toggle="modal" data-target="#exampleModalCenter" >Edit</button>

                                            <div className="modal fade p-5" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered p-5" role="document">
                                                    <div className="modal-content">


                                                        <form className='p-5 '>

                                                            <div className="mb-3 adduser_inputdiv ">
                                                                <label htmlFor="exampleInputEmail1" class="form-label">User Name</label>
                                                                <input type="text" class="form-control" name='username' id="exampleInputEmail1" value={autoFillData.name} aria-describedby="emailHelp"
                                                                    onChange={(e) => setAutoFillData({ ...autoFillData, name: e.target.value })}
                                                                />

                                                            </div>

                                                            <div className="mb-3 adduser_inputdiv ">
                                                                <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                                                                <input type="email" class="form-control" name='email' id="exampleInputEmail1" value={autoFillData.email} aria-describedby="emailHelp"
                                                                    onChange={(e) => setAutoFillData({ ...autoFillData, email: e.target.value })}
                                                                />

                                                            </div>


                                                            <div className="mb-3 adduser_inputdiv ">
                                                                <label htmlFor="exampleInputEmail1" class="form-label">Mobile Number</label>
                                                                <input type="number" class="form-control" name='phone' id="exampleInputEmail1" value={autoFillData.phone} aria-describedby="emailHelp"
                                                                    onChange={(e) => setAutoFillData({ ...autoFillData, phone: e.target.value })}
                                                                />

                                                            </div>

                                                            <div className='mb-3' >
                                                                <button type='submit' className=' btn btn-primary' onClick={e => {
                                                                    e.preventDefault();
                                                                    updateUserData(autoFillData);
                                                                }}>Update</button>
                                                            </div>

                                                        </form>


                                                    </div>
                                                </div>
                                            </div>


                                            <button onClick={(e) => { deleteUser(user.id) }} className='btn btn-danger me-4'>Delete</button>
                                        </td>

                                    </tr>

                                )

                            })

                            }


                        </tbody>
                    </Table>

                </div>



            </div>


        </div>
    )
}

export default AdminHome