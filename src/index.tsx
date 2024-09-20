import { App } from 'App';
import { ErrorPage } from 'components/ErrorPage';
import { Lookup } from 'components/lookup/Lookup';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [{
			path: 'lookup',
			element: <Lookup />
		}],
		errorElement: <ErrorPage />
	},
]);

createRoot(document.getElementById('root') as Element).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
