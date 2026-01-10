import React from "react";
import AdminNavBar from '@/components/AdminNavbar';
import UploadProductForm from "@/components/upload/uploadform";
import AdminFooter from "@/components/AdminFooter";

const AdminUploadPage = () => {
        return (
                <main>
                        <AdminNavBar />
			<UploadProductForm />
                        <AdminFooter />
                </main>
        );
};

export default AdminUploadPage;
