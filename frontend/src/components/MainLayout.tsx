import { Outlet } from "react-router-dom";
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"

const MainLayout = () => {
    return (
        <div className="d-flex">
            {/* <SidebarProvider>
                <AppSidebar /> */}
            <main>
                <Outlet />
            </main>
            {/* </SidebarProvider> */}

        </div>
    )
}

export default MainLayout;