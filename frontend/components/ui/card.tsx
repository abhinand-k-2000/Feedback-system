"use client";

import * as React from "react";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={["rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={["flex flex-col space-y-1.5 p-6", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={["font-semibold leading-none tracking-tight", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={["text-sm text-slate-500", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={["px-6", className].filter(Boolean).join(" ")} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={["flex items-center p-6 pt-0", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
