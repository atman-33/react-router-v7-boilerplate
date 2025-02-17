import { Link } from 'react-router';

const AboutPage = () => {
  return (
    <div id="about">
      <Link to="/demo/contacts" className="text-blue-600 underline">
        ← Go to Address Book
      </Link>
      <h1 className="my-8 font-bold text-4xl">About React Router Contacts</h1>

      <div className="flex flex-col gap-4">
        <p>
          This is a demo application showing off some of the powerful features
          of React Router, including dynamic routing, nested routes, loaders,
          actions, and more.
        </p>

        <h2 className="my-2 font-bold text-2xl">Features</h2>
        <p>Explore the demo to see how React Router handles:</p>
        <ul className="list-disc pl-12">
          <li>Data loading and mutations with loaders and actions</li>
          <li>Nested routing with parent/child relationships</li>
          <li>URL-based routing with dynamic segments</li>
          <li>Pending and optimistic UI</li>
        </ul>

        <h2 className="my-2 font-bold text-2xl">Learn More</h2>
        <p>
          Check out the official documentation at{' '}
          <a
            href="https://reactrouter.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            reactrouter.com
          </a>{' '}
          to learn more about building great web applications with React Router.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
