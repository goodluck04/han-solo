import { store } from "@/redux/store";
import { Provider } from "react-redux";

interface Props {
    children: React.ReactNode | any;
}

export function ReduxProvider({ children }: Props) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}