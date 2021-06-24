import logoImg from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import RoomCode from '../../components/RoomCode';
import Question from '../../components/Question';
import useRoom from '../../hooks/useRoom';

import { useHistory, useParams } from 'react-router-dom';

import deleteImg from '../../assets/images/delete.svg';
import './styles.scss';
import { useCallback } from 'react';
import { database } from '../../services/firebase';

interface RoomParams {
    id: string;
}

const AdminRoom = () => {
    const { id: roomId } = useParams<RoomParams>();
    const { questions, title } = useRoom(roomId);
    const history = useHistory();

    const handleDeleteQuestion = useCallback(async (questionId: string) => {
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            const questionRef = database.ref(`rooms/${roomId}/questions/${questionId}`);

            await questionRef.remove();
        }
    }, [roomId]);

    const handleEndRoom = useCallback(async () => {
        await database.ref(`/rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }, [roomId, history]);

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (
                        <span>{questions.length} pergunta{questions.length > 1 && 's'}</span>
                    )}
                </div>
                
                <div className="question-list">
                    {questions.map(question => (
                        <Question 
                            author={question.author} 
                            content={question.content} 
                            key={question.id} 
                        >
                            <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default AdminRoom;