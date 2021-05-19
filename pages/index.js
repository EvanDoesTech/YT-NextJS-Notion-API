import { Client } from '@notionhq/client';
import { useEffect } from 'react';

// Initializing a client

export default function Employees({ results }) {
  useEffect(() => {
    console.log(results);
  });
  const getDatabaseDisplay = () => {
    let jsx = [];
    results.forEach((employee) => {
      jsx.push(
        <div className="card">
          <p>{employee.properties.Name.title[0].plain_text}</p>
          <p2>{employee.properties.Tags.select.name}</p2>
        </div>
      );
    });
    return jsx;
  };
  return <div>{getDatabaseDisplay()}</div>;
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId = '7e696233738f4bac88f152fa1b11e3ee';
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  console.log();
  return {
    props: {
      results: response.results,
    },
  };
}
