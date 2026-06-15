export default function Calendar() {
  return (
    <>
      <div className="grid grid-cols-7 gap-2">
        <div className="font-semibold text-center text-red-500">日</div>
        <div className="font-semibold text-center">月</div>
        <div className="font-semibold text-center">火</div>
        <div className="font-semibold text-center">水</div>
        <div className="font-semibold text-center">木</div>
        <div className="font-semibold text-center">金</div>
        <div className="font-semibold text-center text-red-500">土</div>
      </div>
      
    </>
  );
}
