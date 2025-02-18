"use client";

import { Post } from "@/app/types/post";
import Image from "next/image";
import { useEffect, useState } from "react";

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("投稿の取得に失敗しました");
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : "投稿の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4">読み込み中...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-4">投稿がありません</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 border rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            {post.author.image && (
              <Image
                src={post.author.image}
                alt={post.author.name || ""}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="font-medium">{post.author.name}</span>
          </div>
          <p className="whitespace-pre-wrap">{post.content}</p>
          <div className="text-sm text-gray-500 mt-2">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}