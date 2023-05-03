import { useState } from 'react';
// Components
import { Search } from "../components/Search"
import { User } from '../components/User';
import { Error } from '../components/Error';
//Types
import { UserProps } from '../types/user';

export const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState<Boolean>(false);

    const loadUser = async (userName: string) => {
        setUser(null);
        setError(false);

        const response = await fetch(`https://api.github.com/users/${userName}`)

        const data = await response.json();

        if (response.status === 404) {
            setError(true);
            return;
        }

        const { avatar_url, name, login, location, followers, following } = data;

        const userData: UserProps = {
            avatar_url,
            name,
            login,
            location,
            followers,
            following,
        };

        setUser(userData);
    };

    return (
        <div>
            <Search loadUser={loadUser} />
            {user && <User {...user} />}
            {error && <Error />}
        </div>
    )
}
