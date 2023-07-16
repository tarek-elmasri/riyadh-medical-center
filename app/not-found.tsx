import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="fixed inset-0 bg-slate-800">
      <div className="h-full grid grid-cols-1 place-items-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl text-neutral-200 font-bold">
            الصفحة غير موجودة
          </h1>
          <p className="text-sm text-neutral-400">
            الرجاء التأكد من استخدام عنوان صحيح
          </p>
          <div className="flex gap-6 mt-6">
            <Link
              href="/"
              className="text-neutral-200 underline underline-offset-8 hover:text-sky-400"
            >
              عودة الى الصفحة الرئيسية
            </Link>
            <Link
              href="/dashboard"
              className="text-neutral-200 underline underline-offset-8 hover:text-sky-400"
            >
              عودة الى لوحة التحكم
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
