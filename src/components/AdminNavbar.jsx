"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import styles from "../styles/Navbar.module.css";


const AdminNavBar = () => {
  const [isHidden, setSidebar] = useState(true);
  const router = useRouter();

  const ShowSidebar = (e) => {
    e?.preventDefault();
    setSidebar(false);
  };

  const HideSidebar = (e) => {
    e?.preventDefault();
    setSidebar(true);
  };

  const isActive = (path) => {
    return router.pathname === path ? styles["active-link"] : "";
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>

        <li className={styles["logo-item"]}>
          <Link href="/">
              <Image src="/logo.png" alt="Nethub Electronics" width={140} height={36} priority />
          </Link>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <Link href="/admin/dashboard" className={`${styles["nav-link"]} ${isActive("/admin/dashboard")}`}>
            Home
          </Link>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <Link href="/admin/about" className={`${styles["nav-link"]} ${isActive("/admin/about")}`}>
            About Us
          </Link>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <div className={styles["travel-dropdown"]}>
            <span className={styles["travel-link"]}>Products</span>
            <ul className={styles["dropdown-menu"]}>
              <li>
                <Link href="#" className={styles["travel-link"]}>
                  Network Devices
                </Link>
              </li>
              <li>
                <Link href="#" className={styles["travel-link"]}>
                  Computers & Accessories
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <Link href="/admin/upload" className={`${styles["nav-link"]} ${isActive("/admin/upload")}`}>
            Post
          </Link>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <Link href="#" className={`${styles["nav-link"]} ${isActive("#")}`}>
            Profile
          </Link>
        </li>

        <li className={styles["menu-button"]}>
                <button
                        onClick={ShowSidebar}
                        className={styles.navIconButton}
                        aria-label="Open menu"
                >
                        <Menu size={26} strokeWidth={2} />
                </button>
        </li>
      </ul>

      <ul className={isHidden ? styles["hide-sidebar"] : styles.sidebar}>
        <li className={styles["close-button"]}>
                <button
                        onClick={HideSidebar}
                        className={styles.navIconButton}
                        aria-label="Close menu"
                >
                        <X size={26} strokeWidth={2} />
                </button>
        </li>


        <li>
          <Link href="/admin/dashboard" className={`${styles["nav-link"]} ${isActive("/admin/dashboard")}`}>Home</Link>
        </li>

        <li>
          <Link href="/admin/about" className={`${styles["nav-link"]} ${isActive("/admin/about")}`}>About Us</Link>
        </li>

        <li>
          <Link href="#" className={styles['nav-link']}>Network Devices</Link>
        </li>

        <li>
          <Link href="#" className={styles['nav-link']}>Computers & Accessories</Link>
        </li>

        <li>
          <Link href="/admin/upload" className={`${styles['nav-link']} ${isActive('/admin/upload')}`}>Post</Link>
        </li>

        <li>
          <Link href="#" className={`${styles['nav-link']} ${isActive('')}`}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
