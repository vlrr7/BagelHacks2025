"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import EmployerNavbar from "@/components/employer-navbar"
import { Card, CardContent } from "@/components/ui/card"

interface SearchResult {
  firstName: string;
  lastName: string;
  email: string;
  preview: string;
  relevanceScore: number;
}

export default function SearchCandidatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/search-candidates', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      setError('Failed to search candidates. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <EmployerNavbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Candidates</h1>
          <p className="text-muted-foreground">Find the perfect candidate for your position</p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter your search query..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}

            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {result.firstName} {result.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Relevance Score: {(result.relevanceScore * 100).toFixed(2)}%
                    </p>
                    <p className="text-muted-foreground">
                      {result.preview}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {searchResults.length === 0 && !loading && !error && (
                <p className="text-center text-muted-foreground">
                  No results found. Try a different search query.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

