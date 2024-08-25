import React from 'react';
import { FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaApple, FaGooglePlay, FaAppStore } from 'react-icons/fa';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <h4>Kurumsal</h4>
        <ul>
          <li><a href="#">Hakkımızda</a></li>
          <li><a href="#">İş Ortaklarımız</a></li>
          <li><a href="#">Yatırımcı ilişkileri</a></li>
          <li><a href="#">Müşteri Hizmetleri</a></li>
          <li><a href="#">Kariyer</a></li>
          <li><a href="#">Kişisel Verilerin Korunması</a></li>
          <li><a href="#">Bilgi Güvenliği Politikası</a></li>
          <li><a href="#">Güvenli Alışveriş Kılavuzu</a></li>
          <li><a href="#">İş Sağlığı ve Güvenliği Çevre Politikamız</a></li>
          <li><a href="#">İletişim</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Hepsiburada</h4>
        <ul>
          <li><a href="#">Satıcı Olmak İstiyorum</a></li>
          <li><a href="#">Hepsipay İşyeri Olmak İstiyorum</a></li>
          <li><a href="#">Tedarikçi Davranış Kuralları</a></li>
          <li><a href="#">Girişimci Kadınlara Teknoloji Gücü</a></li>
          <li><a href="#">Teslimat Noktası Olmak İstiyorum</a></li>
          <li><a href="#">Ödeme Seçenekleri</a></li>
          <li><a href="#">Banka Kampanyaları</a></li>
          <li><a href="#">İşlem Rehberi</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Bizi Takip Edin</h4>
        <ul>
          <li><a href="#"><FaInstagram /> Instagram</a></li>
          <li><a href="#"><FaYoutube /> Youtube</a></li>
          <li><a href="#"><FaTiktok /> TikTok</a></li>
          <li><a href="#"><FaFacebook /> Facebook</a></li>
          <li><a href="#"><FaTwitter /> X</a></li>
          <li><a href="#"><FaLinkedin /> Linkedin</a></li>
          <li><a href="#"><FaPinterest /> Pinterest</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Mobil Uygulamalar</h4>
        <ul className="app-downloads">
  <li><FaApple /> APP STORE'dan İNDİREBİLİRSİNİZ</li>
  <li><FaGooglePlay /> GOOGLE PLAY'dan İNDİREBİLİRSİNİZ</li>
  <li><FaAppStore /> APP GALLERY'den İNDİREBİLİRSİNİZ</li>
</ul>
        <h4>Aklınıza takılan bir soru mu var?</h4>
        <p>Çözüm Merkezine bağlanın veya Çağrı Merkezimizi arayın</p>
        <p>0850 252 40 00</p>
        <p>WhatsApp Destek</p>
      </div>
    </div>
  );
};

export default Footer;
