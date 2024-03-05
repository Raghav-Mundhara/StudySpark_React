import React,{useState ,useEffect} from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo.jsx";
import {SearchIcon} from "./searchIcon.jsx";
import {auth} from '../firebase.js';
import {useNavigate} from 'react-router-dom';

function Header1() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);
    return (
        <Navbar isBordered>
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <AcmeLogo />
                    <p className=" sm:block font-bold text-inherit">StudySpark</p>
                </NavbarBrand>
                <NavbarContent className=" sm:flex gap-3">
                    <NavbarItem isActive>
                        <Link color="foreground" href="/joblisting">
                            Find a Job
                        </Link>
                    </NavbarItem>
                    <NavbarItem >
                        <Link href="#" aria-current="page" color="secondary">
                            Suggested 
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/postjob">
                            Post a Job
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                />
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            src="/images/man.png"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2"
                            onClick={() => navigate('/profile')}
                        >
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">
                                {currentUser ? currentUser.email : 'Loading...'}
                            </p>
                        </DropdownItem>
                        <DropdownItem key="my_order"
                            onClick={() => navigate('/myorders')}
                        >My Orders</DropdownItem>
                        <DropdownItem key="work">My Work</DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={
                            () => {
                                auth.signOut();
                                navigate('/');
                            }
                        }>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}

export default Header1