'use client';

import React, { useEffect, useState } from 'react';

interface Subscription {
  id: number | string;
  title: string;
  url: string;
}

const SubscriptionList: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const res = await fetch('/api/subscriptions');
        if (res.status === 401) {
          setError('Please log in.');
          return;
        }
        if (!res.ok) throw new Error(`Error fetching subscriptions: ${res.statusText}`);
        const data: Subscription[] = await res.json();
        setSubscriptions(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchSubscriptions();
  }, []);

  if (loading) return <p>Loading subscriptions...</p>;
  if (error) return <p>{error}</p>;
  if (subscriptions.length === 0) return <p>No subscriptions yet.</p>;

  return (
    <div>
      <ul>
        {subscriptions.map(({ id, title, url }) => (
          <li key={id} style={{ marginBottom: '1rem' }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;
