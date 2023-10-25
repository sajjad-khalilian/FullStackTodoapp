import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import {FiLogOut} from "react-icons/fi"



function Layout({children}) {


    const logOutHandler = () => {
        signOut()
    }

    const {status} = useSession()

    return (
        <div className="container">
            <header>
                <p>Todo App Site</p>
                {status === "authenticated" ? (
                    <button onClick={logOutHandler}>
                        LogOut
                        <FiLogOut/>
                    </button>
                ) : null}
            </header>
            <div className="container--main">
                <aside>
                    <p>Welcome!!</p>
                    <ul>
                        <li>
                            <VscListSelection/>
                            <Link href="/">Todos</Link>
                        </li>
                        <li>
                            <BiMessageSquareAdd/>
                            <Link href="/addtodo">Add Todo</Link>
                        </li>
                        <li>
                            <RxDashboard/>
                            <Link href="/profile">Profile</Link>
                        </li>
                    </ul>
                </aside>
                <section>{children}</section>
            </div>
        </div>
    )
}

export default Layout
