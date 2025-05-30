import { createContext, useContext } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

const KeyContext = createContext();

function KeyProvider({ children }) {
	const [key, setKey] = useSessionStorage({ initialState: "", key: "encr-key" });

	return <KeyContext.Provider value={{ key, setKey }}>{children}</KeyContext.Provider>;
}

function useKeyEdit() {
	const context = useContext(KeyContext);
	if (context === undefined) throw new Error("KeyContext was used outside of the KeyProvider");

	return context;
}

export { KeyProvider, useKeyEdit };

