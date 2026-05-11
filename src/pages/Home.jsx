export default function Home() {
  return (
    <div>
      <h1>首页</h1>
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} style={{ height: '50px' }}>
          测试内容 {i + 1}
        </div>
      ))}
    </div>
  );
}