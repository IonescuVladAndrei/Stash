import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { KeyProvider } from "./context/KeyContext";
import AppLayout from "./pages/AppLayout";
import AuthPage from "./pages/AuthPage";
import DataPage from "./pages/DataPage";
import TagsPage from "./pages/TagsPage";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DecryptEncryptPage from "./pages/DecryptEncryptPage";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{/* DEV TOOLS */}
			<KeyProvider>
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route index element={<Navigate replace to="auth" />} />

						<Route element={<AppLayout />}>
							<Route path="auth" element={<AuthPage />} />
							<Route path="data" element={<DataPage />} />
							<Route path="tags" element={<TagsPage />} />
							<Route path="decrypt-encrypt" element={<DecryptEncryptPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</KeyProvider>

			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{
					margin: "8px",
				}}
				toastOptions={{
					success: {
						duration: 3500,
					},
					error: {
						duration: 5000,
					},
					style: {
						fontSize: "16px",
						maxWidth: "550px",
						padding: "16px 24px",
						backgroundColor: "var(--color-grey-800)",
						color: "var(--color-grey-100)",
						borderRadius: "var(--border-radius-sm)",
						border: "1px solid var(--color-red-primary-800)",
					},
				}}
			/>
		</QueryClientProvider>
	);
}

export default App;
