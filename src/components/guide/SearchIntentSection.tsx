import type { IncidentType, Locale } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

type Language = TravelerProfile["language"];

interface SearchIntentSectionProps {
  locale: Locale;
  uiLanguage?: Language;
  cityName: string;
  countryName: string;
  incident: IncidentType;
  incidentLabel: string;
}

const questions: Record<Language, Record<IncidentType, (city: string) => string>> = {
  ko: {
    "lost-passport": (city) => `${city}에서 여권 잃어버리면 당일 귀국 가능?`,
    "lost-phone": (city) => `${city}에서 휴대폰 잃어버리면 먼저 무엇부터 해야 하나요?`,
    "lost-wallet": (city) => `${city}에서 지갑 잃어버리면 카드 정지와 경찰 신고 중 무엇이 먼저인가요?`,
    hospital: (city) => `${city}에서 갑자기 아프면 어느 병원이나 응급번호를 이용해야 하나요?`,
    "police-report": (city) => `${city}에서 경찰 신고가 필요하면 어디서 어떤 서류를 받아야 하나요?`,
    scam: (city) => `${city} 여행 사기를 당했을 때 환불이나 신고는 어떻게 하나요?`,
  },
  en: {
    "lost-passport": (city) => `Can you fly home the same day after losing a passport in ${city}?`,
    "lost-phone": (city) => `What should you do first after losing a phone in ${city}?`,
    "lost-wallet": (city) => `Should you freeze cards or file a police report first in ${city}?`,
    hospital: (city) => `Which hospital or emergency number should you use in ${city}?`,
    "police-report": (city) => `Where do travelers get a police report in ${city}?`,
    scam: (city) => `How do you report or dispute a travel scam in ${city}?`,
  },
  ja: {
    "lost-passport": (city) => `${city}でパスポートをなくしたら当日帰国できますか？`,
    "lost-phone": (city) => `${city}でスマホをなくしたら最初に何をすべきですか？`,
    "lost-wallet": (city) => `${city}で財布をなくしたら、カード停止と警察届のどちらが先ですか？`,
    hospital: (city) => `${city}で急に体調を崩したら、どの病院や緊急番号を使うべきですか？`,
    "police-report": (city) => `${city}で警察届が必要なとき、どこでどの書類を受け取れますか？`,
    scam: (city) => `${city}で旅行詐欺に遭ったら、返金や届出はどう進めますか？`,
  },
  "zh-Hans": {
    "lost-passport": (city) => `在${city}丢失护照后，当天还能回国吗？`,
    "lost-phone": (city) => `在${city}丢失手机后，第一步应该做什么？`,
    "lost-wallet": (city) => `在${city}丢失钱包后，先冻结银行卡还是先报警？`,
    hospital: (city) => `在${city}突然生病时，应该去哪家医院或拨打哪个急救电话？`,
    "police-report": (city) => `在${city}需要警方记录时，在哪里办理、拿什么文件？`,
    scam: (city) => `在${city}遇到旅游诈骗后，如何退款或报案？`,
  },
  "zh-Hant": {
    "lost-passport": (city) => `在${city}遺失護照後，當天還能回國嗎？`,
    "lost-phone": (city) => `在${city}遺失手機後，第一步應該做什麼？`,
    "lost-wallet": (city) => `在${city}遺失錢包後，先停卡還是先報警？`,
    hospital: (city) => `在${city}突然不舒服時，應該去哪家醫院或撥打哪個急救電話？`,
    "police-report": (city) => `在${city}需要警方紀錄時，在哪裡辦理、拿什麼文件？`,
    scam: (city) => `在${city}遇到旅遊詐騙後，如何退款或報案？`,
  },
  th: {
    "lost-passport": (city) => `ถ้าพาสปอร์ตหายใน${city} จะกลับประเทศวันเดียวกันได้ไหม?`,
    "lost-phone": (city) => `ถ้าโทรศัพท์หายใน${city} ควรทำอะไรก่อน?`,
    "lost-wallet": (city) => `ถ้ากระเป๋าสตางค์หายใน${city} ควรอายัดบัตรหรือแจ้งตำรวจก่อน?`,
    hospital: (city) => `ถ้าป่วยกะทันหันใน${city} ควรไปโรงพยาบาลไหนหรือโทรเบอร์ฉุกเฉินใด?`,
    "police-report": (city) => `ถ้าต้องใช้รายงานตำรวจใน${city} ควรไปที่ไหนและขอเอกสารอะไร?`,
    scam: (city) => `ถ้าเจอกลโกงระหว่างเที่ยวใน${city} ควรขอคืนเงินหรือแจ้งเรื่องอย่างไร?`,
  },
  vi: {
    "lost-passport": (city) => `Mất hộ chiếu ở ${city} thì có thể về nước trong ngày không?`,
    "lost-phone": (city) => `Mất điện thoại ở ${city} thì nên làm gì trước?`,
    "lost-wallet": (city) => `Mất ví ở ${city} thì nên khóa thẻ hay trình báo cảnh sát trước?`,
    hospital: (city) => `Đột ngột bị bệnh ở ${city} thì nên dùng bệnh viện hay số khẩn cấp nào?`,
    "police-report": (city) => `Ở ${city}, khi cần biên bản cảnh sát thì lấy ở đâu và cần giấy tờ gì?`,
    scam: (city) => `Bị lừa đảo du lịch ở ${city} thì hoàn tiền hoặc trình báo thế nào?`,
  },
};

const answers: Record<Language, (country: string, city: string, incident: string) => string> = {
  ko: (country, city, incident) =>
    `${country} ${city}에서 ${incident} 상황이 생기면, 현장 확인과 증거 확보를 먼저 하고 담당 기관 방문 전에 전화로 접수 가능 시간과 필요 서류를 다시 확인하는 것이 안전합니다. 아래 절차는 검색자가 가장 자주 막히는 순서대로 정리했습니다.`,
  en: (country, city, incident) =>
    `For ${incident.toLowerCase()} in ${city}, ${country}, confirm the situation on site, preserve evidence, and call the responsible office before travelling across town. The steps below are ordered around the points travelers most often get stuck on.`,
  ja: (country, city, incident) =>
    `${country} ${city}で${incident}が起きたら、まず現場確認と証拠保全を行い、担当窓口へ行く前に受付時間と必要書類を電話や公式情報で再確認してください。下の手順は旅行者がつまずきやすい順に整理しています。`,
  "zh-Hans": (country, city, incident) =>
    `在${country}${city}遇到${incident}时，先确认现场情况并保留证据，前往负责机构前请再次确认受理时间和所需文件。以下步骤按旅行者最容易卡住的顺序整理。`,
  "zh-Hant": (country, city, incident) =>
    `在${country}${city}遇到${incident}時，先確認現場情況並保留證據，前往負責機構前請再次確認受理時間和所需文件。以下步驟依旅客最容易卡住的順序整理。`,
  th: (country, city, incident) =>
    `เมื่อเกิด${incident}ใน${city}, ${country} ให้ตรวจสถานการณ์และเก็บหลักฐานก่อน จากนั้นยืนยันเวลาเปิดรับและเอกสารที่ต้องใช้ก่อนเดินทางไปหน่วยงาน ขั้นตอนด้านล่างเรียงตามจุดที่นักเดินทางมักติดขัด`,
  vi: (country, city, incident) =>
    `Khi gặp ${incident} ở ${city}, ${country}, hãy xác nhận tình huống tại chỗ, giữ bằng chứng và gọi kiểm tra giờ nhận hồ sơ cùng giấy tờ cần thiết trước khi di chuyển. Các bước dưới đây được sắp theo những điểm du khách thường bị vướng nhất.`,
};

export function SearchIntentSection({
  locale,
  uiLanguage,
  cityName,
  countryName,
  incident,
  incidentLabel,
}: SearchIntentSectionProps) {
  const language: Language = uiLanguage ?? (locale === "ko" ? "ko" : "en");
  const question = questions[language][incident](cityName);
  const answer = answers[language](countryName, cityName, incidentLabel);

  return (
    <section className="my-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
      <h2 className="text-xl font-bold leading-snug text-gray-950 md:text-2xl">
        {question}
      </h2>
      <p className="mt-3 text-sm leading-6 text-gray-700">{answer}</p>
    </section>
  );
}
