import illustratrionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import Button from '../components/Button';

import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useCallback, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/authContext';

import '../styles/auth.scss';

const NewRoom = () => {
    const {user} = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    const handleCreateRoom = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    }, [newRoom, user, history]);

    return (
        <div id="page-auth">
            <aside>
                <img src={illustratrionImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask"/>

                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={(event) => handleCreateRoom(event)}>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            value={newRoom}
                            onChange={(event) => setNewRoom(event.target.value)}
                        />

                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link></p>
                </div>
            </main>
        </div>
    );
};

export default NewRoom;