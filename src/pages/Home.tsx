import Button from '../components/Button';
import illustratrionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { FormEvent, useCallback, useState } from 'react';
import { useAuth } from '../hooks/authContext';
import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';

import '../styles/auth.scss';

const Home = () => {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    const [roomCode, setRoomCode] = useState('');

    const handleCreateRoom = useCallback(async () => {
        if(!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }, [history, signInWithGoogle, user]);

    const handleJoinRoom = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        if(roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }, [history, roomCode]);

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
                    
                    <Button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </Button>

                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={(event) => handleJoinRoom(event)}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            value={roomCode}
                            onChange={(event) => setRoomCode(event.target.value)}
                        />

                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Home;