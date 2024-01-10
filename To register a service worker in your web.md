To register a service worker in your web application, you can use the following JavaScript code:

This code checks if the browser supports service workers, and if it does, it registers the service worker script located at /service-worker.js when the window's load event fires. The register function returns a promise that resolves to a ServiceWorkerRegistration object, which can be used to manage the registered service worker.

Remember to replace /service-worker.js with the path to your service worker file.