"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const MAX_LENGTH = 140;

export function PostForm() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // 1バイト文字は1、2バイト文字は2としてカウント
    const count = Array.from(content).reduce((acc, char) => {
      return acc + (char.match(/[\u0000-\u00ff]/) ? 1 : 2);
    }, 0);
    setCharCount(count);
  }, [content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (charCount > MAX_LENGTH) {
      alert("文字数が制限を超えています");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      setContent("");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "投稿に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user) {
    return null;
  }

  const remainingChars = MAX_LENGTH - charCount;
  const charCountColor = cn(
    "font-mono",
    remainingChars <= 0 && "text-red-500 font-bold",
    remainingChars > 0 && remainingChars <= 20 && "text-orange-500"
  );

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "ユーザーアイコン"}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
        </div>
        <div className="flex-grow space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-24 p-2 border rounded-md resize-none"
            placeholder="お知らせを入力してください"
            required
          />
          <div className="flex justify-end items-center gap-4">
            <span className={charCountColor}>{remainingChars}</span>
            <Button type="submit" disabled={isLoading || remainingChars < 0}>
              {isLoading ? "投稿中..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}