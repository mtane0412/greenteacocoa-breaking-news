"use client";

import { PostForm } from "@/app/components/post-form";
import { PostList } from "@/app/components/post-list";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Twitch Breaking News</h1>
        {!session && (
          <Button
            onClick={() => signIn('twitch')}
            className="bg-[#9146FF] hover:bg-[#7c2eff] text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2"
            >
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
            Twitchでログイン
          </Button>
        )}
      </div>
      
      {session ? (
        <div className="space-y-8">
          <PostForm />
          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">投稿一覧</h2>
            <PostList />
          </div>
          <div className="flex justify-center mt-8 pt-8 border-t">
            <Button
              onClick={() => signOut()}
              className="w-full max-w-xs"
            >
              ログアウト
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">
            お知らせを投稿するにはログインが必要です
          </p>
        </div>
      )}
    </main>
  );
}
