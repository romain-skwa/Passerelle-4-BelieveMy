"use client";

export default function creatorLayout({ children }) { 
  return (
    <>
      <video
        src="/background/cyberPunkLiveWallpaper.mp4"
        autoPlay
        loop
        muted
        className="video"
      />
     <main className="flex-grow pt-6 pb-6 content">{children}</main>
    </>
  );
}
