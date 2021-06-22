import { useHistory } from 'react-router-dom';

import illustratrionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import Button from '../components/Button';
import { useCallback } from 'react';
import { useAuth } from '../hooks/auth';

const Home = () => {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    const handleCreateRoom = useCallback(async () => {
        if(!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }, [history, signInWithGoogle, user]);

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
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />

                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Home;