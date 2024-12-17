import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ResponsivePagination from 'react-responsive-pagination';
import SearchUser from '../SearchUser/SearchUser';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Tooltip } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import FormPostEvent from '../../PostEvent/FormPostEvent/FormPostEvent';



const AllPayUser = ({ users, deleteUser, page, setPage, setAllPayUser, allPayUser, setIsLoading, getAllPayUser }) => {
    const navigate = useNavigate()
    const handleRedirectModalInfoUser = (userId) => navigate(`/infoUser/${userId}`)


    return (

        <>
            <Container>
                <Row className="p-5">
                    <Col>
                        <div
                            className=' d-flex flex-col align-items-center pb-3 flex-md-row justify-content-md-between align-items-md-center'
                        >
                            <h2
                                className=' pb-3'
                            >Lista utenti</h2>
                            <SearchUser
                                users={users}
                                setAllPayUser={setAllPayUser}
                                allPayUser={allPayUser}
                                setIsLoading={setIsLoading}
                                getAllPayUser={getAllPayUser}

                            />
                        </div>

                        <Table
                            responsive
                            striped="columns">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Cognome</th>
                                    <th>Email</th>
                                    <th>Ruolo</th>
                                    <th>Azione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users.map((user, idx) => (
                                        <tr
                                            key={user._id}>
                                            <td>{idx + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.surname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td
                                                className=' d-flex gap-2 justify-content-start'
                                            >
                                                <Tooltip content="Cancella utente">
                                                    <button
                                                        className="bg-white rounded-2 p-1 text-hover text-reset"
                                                        onClick={() => deleteUser(user._id)}
                                                    >
                                                        <RiDeleteBin6Line
                                                            size={25}
                                                        />

                                                    </button>
                                                </Tooltip>
                                                <Tooltip content="Dettagli utente">
                                                    <button
                                                        className="bg-white rounded-2 p-1 text-hover text-reset"
                                                        onClick={() => handleRedirectModalInfoUser(user._id)}
                                                    >
                                                        <IoInformationCircleOutline

                                                            size={25}
                                                        />

                                                    </button>
                                                </Tooltip>
                                            </td>

                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Col>

                </Row>
                {users &&
                    <Row>
                        <Col>
                            <ResponsivePagination
                                current={page}
                                total={allPayUser.totalPages || 1}
                                onPageChange={setPage}

                            />
                        </Col>
                        <FormPostEvent />
                    </Row>
                }
            </Container>
            
        </>

    );
};

export default AllPayUser;



