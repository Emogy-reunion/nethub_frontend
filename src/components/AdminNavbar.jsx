"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, Mail, Upload } from "lucide-react"; // Icons
import { useRouter } from "next/navigation";
import styles from "../styles/Navbar.module.css";

const productGroups = [
  {
    name: "Networking Equipment",
    value: "networking-equipment",
    categories: [
      { name: "Routers", value: "routers" },
      { name: "Switches", value: "switches" },
      { name: "Access Points", value: "access-points" },
      { name: "P+D CPE", value: "p+d-cpe" },
      { name: "4G Devices", value: "4g-devices" },
    ],
  },
  {
    name: "Structured Cabling",
    value: "structured-cabling",
    categories: [
      { name: "Cat 6 Cables", value: "cat-6-cables" },
      { name: "Data Sockets", value: "data-sockets" },
      { name: "Network Cabinets", value: "network-cabinets" },
      { name: "PDU", value: "pdu" },
      { name: "Cable Manager", value: "cable-manager" },
      { name: "Patch Panels", value: "patch-panels" },
    ],
  },
  {
    name: "Audio & Visual",
    value: "audio-visual",
    categories: [
      { name: "HDMI Extender/Converter", value: "hdmi-extender-converters" },
      { name: "HDMI Cables", value: "hdmi-cables" },
      { name: "Optic & VGA Cables", value: "optic-and-vga-cables" },
      { name: "Android Boxes", value: "android-boxes" },
    ],
  },
  {
    name: "Fibre Optic",
    value: "fibre-optic",
    categories: [
      { name: "OLT", value: "olt" },
      { name: "ONU", value: "onu" },
      { name: "Fibre Patchcords", value: "fibre-patchcords" },
      { name: "Media Converters", value: "media-converters" },
      { name: "SFP", value: "sfp" },
      { name: "ODF", value: "odf" },
      { name: "Enclosures & Fat Boxes", value: "enclosures-fat-boxes" },
      { name: "Fiber Cables", value: "fiber-cables" },
    ],
  },
  {
    name: "Accessories & Tools",
    value: "accessories-tools",
    categories: [],
  },
];

const AdminNavBar = () => {
  const [isSidebarOpen, setSidebar] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const router = useRouter();

  const toggleSidebar = () => {
          setSidebar((prev) => !prev);
          setExpandedGroup(null);
  };

  const toggleGroup = (groupValue) => {
          setExpandedGroup(expandedGroup === groupValue ? null : groupValue);
  };

  const isActive = (path) => (router.pathname === path ? styles["active-link"] : "");


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <nav className={styles.nav}>
      {/* Desktop Navbar */}
      <ul className={styles.navList}>
        {/* Logo */}
        <li className={styles.logoItem}>
          <Link href="/admin/dashboard">
            <Image src="/logo.png" alt="Nethub Electronics" width={140} height={36} />
          </Link>
        </li>

        {/* Product Groups (centered) */}
        <div className={styles.centerLinks}>
          {productGroups.map((group) => (
            <li key={group.value} className={styles.travelDropdown}>
              <Link
                href={`/admin/products?group=${group.value}`}
                className={styles.travelLink}
              >
                {group.name} {group.categories.length > 0 && <span className={styles.dropdownArrow}>▼</span>}
              </Link>
              {group.categories.length > 0 && (
                <ul className={styles.dropdownMenu}>
                  {group.categories.map((cat) => (
                    <li key={cat.value}>
                      <Link
                        href={`/admin/products?group=${group.value}&category=${cat.value}`}
                        className={styles.travelLink}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </div>

        {/* Right-side icons */}
        <div className={styles.rightLinks}>
          <li>
            <Link href="/admin/upload" className={styles.iconLink}>
              <Upload size={24} />
            </Link>
          </li>
          <li>
            <Link href="#" className={styles.iconLink}>
              <User size={24} />
            </Link>
          </li>
        </div>

        {/* Mobile Menu Button */}
        <li className={styles.menuButton}>
          <button onClick={toggleSidebar} className={styles.navIconButton} aria-label="Menu">
            {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </li>
      </ul>

      {/* Sidebar for mobile */}
      {isSidebarOpen && (
        <ul className={styles.sidebar}>
          <li className={styles.closeButton}>
            <button onClick={toggleSidebar} className={styles.navIconButton}>
              <X size={26} />
            </button>
          </li>
          <li>
            <Link href="/admin/dashboard" className={styles.navLink}>Home</Link>
          </li>

         {productGroups.map((group) => (
                <li key={group.value} className={styles.mobileNavItem}>
                        <div className={styles.mobileLinkWrapper}>
                                <Link
                                         href={`/admin/products?group=${group.value}`}
                                        className={styles.navLink}
                                        onClick={() => setSidebar(false)}
                                >
                                        {group.name}
                                </Link>
      
                                {/* Mobile Arrow Button */}
                                {group.categories.length > 0 && (
                                        <button 
                                                onClick={() => toggleGroup(group.value)} 
                                                className={styles.mobileArrowBtn}
                                        >
                                                <span className={expandedGroup === group.value ? styles.rotateArrow : ""}>
                                                        ▼
                                                </span>
                                        </button>
                                )}
                        </div>

                        {/* Expanded Sub-menu */}
                        {group.categories.length > 0 && expandedGroup === group.value && (
                                <ul className={styles.mobileDropdown}>
                                        {group.categories.map((cat) => (
                                                <li key={cat.value}>
                                                        <Link
                                                                href={`/admin/products?group=${group.value}&category=${cat.value}`}
                                                                className={styles.navLink}
                                                                onClick={() => setSidebar(false)}
                                                        >
                                                                {cat.name}
                                                        </Link>
                                                </li>
                                        ))}
                                </ul>
                        )}
                </li>
           ))} 

          <li>
            <Link href="/admin/upload" className={styles.navLink}>Post</Link>
          </li>
          <li>
            <Link href="#" className={styles.navLink}>Profile</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default AdminNavBar;
