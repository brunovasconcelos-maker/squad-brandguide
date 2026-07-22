export default function ImageGrid({ images }) {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <div key={image.filename} className="image-grid__cell">
          <img src={image.src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
