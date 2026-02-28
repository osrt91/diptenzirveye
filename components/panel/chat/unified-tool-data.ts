import {
    ChatGPTIcon, ClaudeIcon, GeminiIcon, MidjourneyIcon, CursorIcon,
    ZapierIcon, V0Icon, PerplexityIcon, NotionIcon, CopilotIcon,
    DeepSeekIcon, KimiIcon, WindsurfIcon, YandexIcon, GrokIcon,
    KaggleIcon, HuggingFaceIcon, FigmaIcon, TrelloIcon, CanvaIcon
} from "./ai-tool-badges";

export type ToolCategory = "Yazılım" | "Tasarım" | "Pazarlama" | "SEO" | "Otomasyon";

export interface AITool {
    name: string;
    category: ToolCategory;
    Icon: React.ComponentType<{ className?: string }>;
    description?: string;
    url?: string;
}

export const topTierTools: AITool[] = [
    { name: "Canva", category: "Tasarım", Icon: CanvaIcon, description: "Herkes için pratik, hızlı ve etkili grafik tasarım." },
    { name: "ChatGPT", category: "Pazarlama", Icon: ChatGPTIcon, description: "OpenAI'nin metin ve strateji üretimi alanındaki lokomotifi." },
    { name: "Claude", category: "Pazarlama", Icon: ClaudeIcon, description: "Doğal dili, mantık yürütmesi ve yaratıcı yazarlığı en üst seviyede." },
    { name: "Cursor AI", category: "Yazılım", Icon: CursorIcon, description: "Yapay Zeka destekli yenilikçi kod editörü." },
    { name: "DeepSeek", category: "Yazılım", Icon: DeepSeekIcon, description: "Kodlama ve analitik görevlerde öne çıkan güçlü dil modeli." },
    { name: "Figma", category: "Tasarım", Icon: FigmaIcon, description: "Arayüz tasarımında dünya standardı tartışılmaz lider." },
    { name: "Gemini", category: "Pazarlama", Icon: GeminiIcon, description: "Google'ın ekosistemiyle derin entegre yapay zeka devi." },
    { name: "GitHub Copilot", category: "Yazılım", Icon: CopilotIcon, description: "Dünyanın en çok kullanılan kod tamamlama asistanı." },
    { name: "HuggingFace", category: "SEO", Icon: HuggingFaceIcon, description: "Binlerce açık kaynak modelin bulunduğu makine öğrenimi merkezi." },
    { name: "Kaggle", category: "SEO", Icon: KaggleIcon, description: "Veri bilimi yarışmaları ve devasa veri setleriyle içgörü çıkarımı." },
    { name: "Kimi", category: "Pazarlama", Icon: KimiIcon, description: "Uzun bağlamları anlama konusunda iddialı araştırma asistanı." },
    { name: "Midjourney", category: "Tasarım", Icon: MidjourneyIcon, description: "Sektör standartlarını belirleyen metinden görsel üretme aracı." },
    { name: "Notion", category: "Pazarlama", Icon: NotionIcon, description: "Tüm çalışma alanınızı ve içerik takviminizi yöneteceğiniz merkez." },
    { name: "Perplexity", category: "SEO", Icon: PerplexityIcon, description: "Arama motorlarının geleceği; kaynak analizli araştırma devi." },
    { name: "Trello AI", category: "Otomasyon", Icon: TrelloIcon, description: "Proje yönetimi ve takım akışlarını görselleştiren Kanban ustası." },
    { name: "v0 by Vercel", category: "Yazılım", Icon: V0Icon, description: "Prompt ile anında UI bileşenleri ve sayfalar oluşturun." },
    { name: "Windsurf", category: "Yazılım", Icon: WindsurfIcon, description: "Geleceğin hızında kodlama asistanı." },
    { name: "Yandex AI", category: "SEO", Icon: YandexIcon, description: "Görsel, veri ve arama algoritmalarında güçlü Rus yapay zekası." },
    { name: "Zapier", category: "Otomasyon", Icon: ZapierIcon, description: "Binlerce yazılımı birbirine bağlayan otomasyon köprüsü." },
];
