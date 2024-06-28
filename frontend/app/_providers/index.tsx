import { ReactNode } from "react";
import SonnerProvider from "./sonner.provider";
import TanstckProvider from "./tenstack.provider";

const RootProvider = ({ children }: { children: ReactNode; }) => {
    return (
        <TanstckProvider>
            <SonnerProvider>
                {children}
            </SonnerProvider>
        </TanstckProvider>
    );
};
export default RootProvider;