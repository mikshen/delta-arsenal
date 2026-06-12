const STORAGE_KEY = "delta-arsenal-builds-v1";

const weaponCategories = ["步枪", "冲锋枪", "霰弹枪", "轻机枪", "精确射手步枪", "狙击步枪", "特殊武器"];

const attachmentDatabase = [
  {
    id: "dd-python-handguard-panel",
    name: "DD蟒蛇护木片",
    slot: "护木片",
    rarity: "rare",
    source: "M7 PDF page 01",
    effects: [{ type: "positive", stat: "操控速度" }]
  },
  {
    id: "peq-2-red-laser",
    name: "PEQ-2红色激光镭指",
    slot: "左导轨",
    rarity: "epic",
    source: "M7 PDF page 02 image 01",
    conditionalEffects: [
      {
        condition: "开启激光镭指时",
        effects: [
          { type: "positive", stat: "操控速度" },
          { type: "positive", stat: "腰际射击精度" },
          { type: "positive", stat: "允许战术据枪姿态" },
          { type: "negative", stat: "激光镭射开启时敌人可见" }
        ]
      },
      {
        condition: "关闭激光镭指时",
        effects: [{ type: "negative", stat: "操控速度" }]
      }
    ]
  },
  {
    id: "ffc-dual-port-brake",
    name: "FFC双流制退器",
    slot: "枪口",
    rarity: "epic",
    source: "M7 PDF page 02 image 02",
    effects: [
      { type: "positive", stat: "后坐力控制" },
      { type: "positive", stat: "据枪稳定性" },
      { type: "positive", stat: "开火时枪身稳定性" },
      { type: "positive", stat: "开火时视野稳定性" },
      { type: "negative", stat: "操控速度" },
      { type: "negative", stat: "枪焰干扰瞄准视野" }
    ]
  },
  {
    id: "m7-hurricane-long-barrel-combo",
    name: "M7提风超长枪管组合",
    slot: "枪管",
    rarity: "epic",
    compatibleWeapons: ["M7战斗步枪"],
    source: "M7 PDF page 03 image 01, page 07 image 01",
    effects: [
      { type: "positive", stat: "击发伤害" },
      { type: "positive", stat: "有效射程与枪口初速" },
      { type: "positive", stat: "据枪稳定性" },
      { type: "negative", stat: "操控速度" },
      { type: "negative", stat: "腰际射击精度" }
    ],
    calibration: {
      sliders: [
        { label: "配重", value: "+50g" },
        { label: "长度", value: "+10毫米" }
      ],
      effects: [
        { type: "positive", stat: "开火时武器稳定性", value: "+4%" },
        { type: "positive", stat: "枪口初速", value: "+9%" },
        { type: "negative", stat: "瞄准时移动速度", value: "-4%" },
        { type: "negative", stat: "开镜速度", value: "-3%" }
      ]
    }
  },
  {
    id: "olight-warrior-3s-tactical-light",
    name: "OLIGHT WARRIOR 3S战术手电",
    slot: "右导轨",
    rarity: "epic",
    source: "M7 PDF page 03 image 02",
    effects: [
      { type: "positive", stat: "主动爆闪致盲" },
      { type: "positive", stat: "战术手电照明范围：中" }
    ]
  },
  {
    id: "xcog-assault-3-5x-scope",
    name: "XCOG突击3.5倍瞄准镜",
    slot: "瞄准镜",
    rarity: "rare",
    source: "M7 PDF page 04 image 01, page 09 image 02",
    effects: [
      { type: "positive", stat: "中等倍率光学放大视野" },
      { type: "negative", stat: "操控速度" }
    ],
    calibration: {
      sliders: [
        { label: "缩放倍率", value: "-0.50" },
        { label: "瞳距", value: "-1.40mm" }
      ],
      effects: [
        { type: "negative", stat: "放大倍率", value: "-0.50" },
        { type: "negative", stat: "眼距", value: "-1.40mm" }
      ]
    }
  },
  {
    id: "ct-enhanced-stock",
    name: "CT增强型后托",
    slot: "枪托",
    rarity: "epic",
    source: "M7 PDF page 04 image 02, page 09 image 01",
    effects: [
      { type: "positive", stat: "后坐力控制" },
      { type: "positive", stat: "操控速度" },
      { type: "positive", stat: "据枪稳定性" },
      { type: "positive", stat: "举镜瞄准移速" },
      { type: "negative", stat: "腰际射击精度" }
    ],
    calibration: {
      sliders: [
        { label: "配重", value: "+50g" },
        { label: "安装位置", value: "-4格" }
      ],
      effects: [
        { type: "positive", stat: "额外后坐力控制", value: "+6%" },
        { type: "positive", stat: "举镜瞄准速度", value: "+4.80%" },
        { type: "negative", stat: "瞄准时呼吸稳定性", value: "-18%" },
        { type: "negative", stat: "开火时武器稳定性", value: "-3.84%" }
      ]
    }
  },
  {
    id: "phantom-rear-grip",
    name: "幻影后握把",
    slot: "后握把",
    rarity: "epic",
    source: "M7 PDF page 05 image 01, page 08 image 01",
    effects: [
      { type: "positive", stat: "后坐力控制" },
      { type: "positive", stat: "操控速度" },
      { type: "negative", stat: "据枪稳定性" }
    ],
    calibration: {
      sliders: [
        { label: "配重", value: "+50g" },
        { label: "厚度", value: "-20毫米" }
      ],
      effects: [
        { type: "positive", stat: "举枪瞄准速度", value: "+4%" },
        { type: "positive", stat: "额外后坐力控制", value: "+6%" },
        { type: "negative", stat: "移动时据枪稳定性", value: "-16%" },
        { type: "negative", stat: "瞄准时呼吸稳定性", value: "-18%" }
      ]
    }
  },
  {
    id: "m7-45-round-6-8-drum",
    name: "M7 45发6.8弹鼓",
    slot: "弹匣",
    rarity: "epic",
    compatibleWeapons: ["M7战斗步枪"],
    source: "M7 PDF page 05 image 02",
    effects: [
      { type: "neutral", stat: "45发容量" },
      { type: "negative", stat: "操控速度" },
      { type: "negative", stat: "换弹时间惩罚" }
    ]
  },
  {
    id: "grizzly-full-power-quick-pull-sleeve-sand",
    name: "灰熊全威力快拔套(沙)",
    slot: "弹匣座",
    rarity: "rare",
    source: "M7 PDF page 06 image 01",
    effects: [{ type: "positive", stat: "操控速度" }]
  },
  {
    id: "resonant-gen3-foregrip",
    name: "共振三代握把",
    slot: "前握把",
    rarity: "epic",
    source: "M7 PDF page 06 image 02, page 07 image 02",
    effects: [
      { type: "positive", stat: "据枪稳定性" },
      { type: "positive", stat: "腰际射击精度" },
      { type: "positive", stat: "垂直后坐力控制" },
      { type: "negative", stat: "操控速度" },
      { type: "negative", stat: "水平后坐力控制" }
    ],
    calibration: {
      sliders: [
        { label: "厚度", value: "-20毫米" },
        { label: "配重", value: "+20g" }
      ],
      effects: [
        { type: "positive", stat: "瞄准时移动速度", value: "+4%" },
        { type: "positive", stat: "额外后坐力控制", value: "+4%" },
        { type: "negative", stat: "移动时据枪稳定性", value: "-16%" },
        { type: "negative", stat: "举镜瞄准速度", value: "-4%" }
      ]
    }
  }
];

const builtInBuilds = [
  {
    id: "m7-battle-rifle-6kb36b40f6j83uvmo8ev8",
    weapon: "M7战斗步枪",
    title: "谱系蓝图展示",
    category: "步枪",
    mode: "未标注",
    code: "6KB36B40F6J83UVMO8EV8",
    note: "来自 2026-06-12 截图录入。当前已记录改枪码、枪械类别和面板属性；具体配件名称需要后续近景图或文字补齐。",
    parts: [
      "枪口：FFC双流制退器",
      "枪管：M7提风超长枪管组合",
      "左导轨：PEQ-2红色激光镭指",
      "右导轨：OLIGHT WARRIOR 3S战术手电",
      "上护木片：DD蟒蛇护木片",
      "左护木片：DD蟒蛇护木片",
      "右护木片：DD蟒蛇护木片",
      "下护木片：DD蟒蛇护木片",
      "瞄准镜：XCOG突击3.5倍瞄准镜",
      "枪托：CT增强型后托",
      "后握把：幻影后握把",
      "前握把：共振三代握把",
      "弹匣：M7 45发6.8弹鼓",
      "弹匣座：灰熊全威力快拔套(沙)"
    ],
    attachments: [
      { slot: "枪口", attachmentId: "ffc-dual-port-brake" },
      { slot: "枪管", attachmentId: "m7-hurricane-long-barrel-combo" },
      { slot: "左导轨", attachmentId: "peq-2-red-laser" },
      { slot: "右导轨", attachmentId: "olight-warrior-3s-tactical-light" },
      { slot: "上护木片", attachmentId: "dd-python-handguard-panel" },
      { slot: "左护木片", attachmentId: "dd-python-handguard-panel" },
      { slot: "右护木片", attachmentId: "dd-python-handguard-panel" },
      { slot: "下护木片", attachmentId: "dd-python-handguard-panel" },
      { slot: "瞄准镜", attachmentId: "xcog-assault-3-5x-scope" },
      { slot: "枪托", attachmentId: "ct-enhanced-stock" },
      { slot: "后握把", attachmentId: "phantom-rear-grip" },
      { slot: "前握把", attachmentId: "resonant-gen3-foregrip" },
      { slot: "弹匣", attachmentId: "m7-45-round-6-8-drum" },
      { slot: "弹匣座", attachmentId: "grizzly-full-power-quick-pull-sleeve-sand" }
    ],
    stats: [
      { label: "基础伤害", value: "40" },
      { label: "优势射程", value: "65 米" },
      { label: "后坐力控制", value: "53" },
      { label: "操控速度", value: "46" },
      { label: "据枪稳定性", value: "66" },
      { label: "腰际射击精度", value: "39" },
      { label: "护甲伤害", value: "42" },
      { label: "射速", value: "649 发/分" },
      { label: "容量", value: "45" },
      { label: "开火模式", value: "全自动/单发" },
      { label: "枪口初速", value: "893 米/秒" },
      { label: "枪声传播距离", value: "600 米" }
    ],
    rating: 8,
    shared: true,
    favorite: true,
    createdAt: 1718214120000
  },
  {
    id: "m4a1-stable-mid-range-demo",
    weapon: "M4A1",
    title: "稳控中距离",
    category: "步枪",
    mode: "全面战场",
    code: "M4A1-稳控中距离-6F8A-DELTA",
    note: "偏低后座和中距离点射，适合不想频繁调枪的通用配置。",
    parts: ["补偿器", "长枪管", "垂直握把", "轻量枪托", "2倍镜"],
    rating: 9,
    shared: true,
    favorite: true,
    createdAt: 1718214119000
  },
  {
    id: "vector-close-burst-demo",
    weapon: "Vector",
    title: "近点爆发",
    category: "冲锋枪",
    mode: "烽火地带",
    code: "VECTOR-近点爆发-42K9-DELTA",
    note: "强调开镜速度和近距离贴脸输出，中远距离需要控制交火距离。",
    parts: ["消焰器", "短枪管", "战术握把", "扩容弹匣", "红点"],
    rating: 8,
    shared: true,
    favorite: false,
    createdAt: 1718214118000
  },
  {
    id: "sr25-semi-anchor-demo",
    weapon: "SR-25",
    title: "半自动架点",
    category: "精确射手步枪",
    mode: "全面战场",
    code: "SR25-半自动架点-9Q2P-DELTA",
    note: "适合中远距离架枪和补枪，机动性一般，但连续命中稳定。",
    parts: ["精密枪口", "重型枪管", "脚架握把", "托腮板", "6倍镜"],
    rating: 8,
    shared: false,
    favorite: true,
    createdAt: 1718214117000
  }
];

const state = {
  builds: loadBuilds(),
  selectedId: null,
  type: "all",
  collection: "all",
  query: "",
  editingId: null
};

const els = {
  savedCount: document.querySelector("#savedCount"),
  weaponCount: document.querySelector("#weaponCount"),
  resultCount: document.querySelector("#resultCount"),
  buildList: document.querySelector("#buildList"),
  searchInput: document.querySelector("#searchInput"),
  segments: document.querySelectorAll(".segment"),
  navItems: document.querySelectorAll(".nav-item"),
  detailEmpty: document.querySelector("#detailEmpty"),
  detailCard: document.querySelector("#detailCard"),
  detailCategory: document.querySelector("#detailCategory"),
  detailName: document.querySelector("#detailName"),
  detailCode: document.querySelector("#detailCode"),
  detailNote: document.querySelector("#detailNote"),
  detailRating: document.querySelector("#detailRating"),
  detailMode: document.querySelector("#detailMode"),
  detailVisibility: document.querySelector("#detailVisibility"),
  detailParts: document.querySelector("#detailParts"),
  detailAttachments: document.querySelector("#detailAttachments"),
  detailStats: document.querySelector("#detailStats"),
  favoriteBtn: document.querySelector("#favoriteBtn"),
  copyDetailBtn: document.querySelector("#copyDetailBtn"),
  copyShareBtn: document.querySelector("#copyShareBtn"),
  editBtn: document.querySelector("#editBtn"),
  deleteBtn: document.querySelector("#deleteBtn"),
  newBuildBtn: document.querySelector("#newBuildBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  importFile: document.querySelector("#importFile"),
  dialog: document.querySelector("#buildDialog"),
  form: document.querySelector("#buildForm"),
  dialogTitle: document.querySelector("#dialogTitle"),
  closeDialogBtn: document.querySelector("#closeDialogBtn"),
  cancelBtn: document.querySelector("#cancelBtn"),
  toast: document.querySelector("#toast")
};

function loadBuilds() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return builtInBuilds;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? mergeBuiltIns(parsed.map(normalizeBuild)) : builtInBuilds;
  } catch {
    return builtInBuilds;
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.builds));
}

function mergeBuiltIns(savedBuilds) {
  const byKey = new Map();
  [...builtInBuilds, ...savedBuilds].forEach((build) => {
    const normalized = normalizeBuild(build);
    const key = normalized.code || normalized.id;
    byKey.set(key, mergeBuildRecords(byKey.get(key), normalized));
  });
  return Array.from(byKey.values()).sort(
    (a, b) => Number(b.favorite) - Number(a.favorite) || b.createdAt - a.createdAt
  );
}

function mergeBuildRecords(base, incoming) {
  if (!base) return incoming;
  const merged = { ...base, ...incoming };
  if (!incoming.parts?.length && base.parts?.length) merged.parts = base.parts;
  if (!incoming.attachments?.length && base.attachments?.length) merged.attachments = base.attachments;
  if (!incoming.stats?.length && base.stats?.length) merged.stats = base.stats;
  return merged;
}

function normalizeBuild(build) {
  const category = weaponCategories.includes(build.category) ? build.category : normalizeCategory(build.category);
  return {
    id: build.id || crypto.randomUUID(),
    weapon: build.weapon || "未命名",
    title: build.title || "默认配置",
    category,
    mode: build.mode || "",
    code: build.code || "",
    note: build.note || "",
    parts: Array.isArray(build.parts) ? build.parts : [],
    attachments: Array.isArray(build.attachments) ? build.attachments : [],
    stats: Array.isArray(build.stats) ? build.stats : [],
    rating: Number(build.rating) || 8,
    shared: Boolean(build.shared),
    favorite: Boolean(build.favorite),
    createdAt: build.createdAt || Date.now()
  };
}

function normalizeCategory(category) {
  const legacyMap = {
    狙击: "狙击步枪",
    机枪: "轻机枪",
    手枪: "特殊武器"
  };
  return legacyMap[category] || "步枪";
}

function getFilteredBuilds() {
  const query = state.query.trim().toLowerCase();
  return state.builds
    .filter((build) => state.type === "all" || build.category === state.type)
    .filter((build) => {
      if (state.collection === "favorite") return build.favorite;
      if (state.collection === "shared") return build.shared;
      return true;
    })
    .filter((build) => {
      if (!query) return true;
      const haystack = [
        build.weapon,
        build.title,
        build.category,
        build.mode,
        build.code,
        build.note,
        ...(build.parts || []),
        ...(build.attachments || []).flatMap((item) => {
          const attachment = getAttachment(item.attachmentId);
          return [item.slot, attachment?.name];
        }),
        ...(build.stats || []).flatMap((stat) => [stat.label, stat.value])
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    })
    .sort((a, b) => Number(b.favorite) - Number(a.favorite) || b.createdAt - a.createdAt);
}

function render() {
  const filtered = getFilteredBuilds();
  if (!state.selectedId || !state.builds.some((build) => build.id === state.selectedId)) {
    state.selectedId = filtered[0]?.id || null;
  }

  els.savedCount.textContent = state.builds.length;
  els.weaponCount.textContent = new Set(state.builds.map((build) => build.weapon)).size;
  els.resultCount.textContent = `${filtered.length} 条`;
  renderList(filtered);
  renderDetail();
}

function renderList(builds) {
  if (!builds.length) {
    els.buildList.innerHTML = `<div class="empty-state"><h3>没有匹配配置</h3><p>换个筛选条件，或者新增一条自己的改枪码。</p></div>`;
    return;
  }

  els.buildList.innerHTML = builds
    .map(
      (build) => `
      <button class="build-card ${build.id === state.selectedId ? "is-active" : ""}" data-id="${build.id}">
        <span class="build-card-top">
          <span>
            <span class="eyebrow">${escapeHtml(build.category)} / ${escapeHtml(build.mode || "未标注")}</span>
            <h4>${escapeHtml(build.weapon)} · ${escapeHtml(build.title)}</h4>
          </span>
          <span>${build.favorite ? "★" : "☆"}</span>
        </span>
        <span class="tag-row">
          ${build.parts.slice(0, 3).map((part) => `<span class="tag">${escapeHtml(part)}</span>`).join("")}
          ${build.shared ? `<span class="tag">可分享</span>` : `<span class="tag">私有</span>`}
        </span>
        <span class="build-card-bottom">
          <span class="mini-code">${escapeHtml(build.code)}</span>
          <span class="quick-copy" data-copy-id="${build.id}">复制</span>
        </span>
      </button>
    `
    )
    .join("");
}

function renderDetail() {
  const build = state.builds.find((item) => item.id === state.selectedId);
  els.detailEmpty.classList.toggle("is-hidden", Boolean(build));
  els.detailCard.classList.toggle("is-hidden", !build);

  if (!build) return;

  els.detailCategory.textContent = `${build.category} / ${build.mode || "未标注玩法"}`;
  els.detailName.textContent = `${build.weapon} · ${build.title}`;
  els.detailCode.textContent = build.code;
  els.detailNote.textContent = build.note || "没有备注。";
  els.detailRating.textContent = `${build.rating || 0}/10`;
  els.detailMode.textContent = build.mode || "未标注";
  els.detailVisibility.textContent = build.shared ? "可分享" : "仅自己";
  els.favoriteBtn.textContent = build.favorite ? "★" : "☆";
  els.detailParts.innerHTML = (build.parts || [])
    .map((part) => `<span class="part-chip">${escapeHtml(part)}</span>`)
    .join("");
  els.detailAttachments.innerHTML = (build.attachments || [])
    .map((item) => renderAttachmentCard(item))
    .join("");
  els.detailStats.innerHTML = (build.stats || [])
    .map(
      (stat) => `
      <div class="stat-item">
        <span>${escapeHtml(stat.label)}</span>
        <strong>${escapeHtml(stat.value)}</strong>
      </div>
    `
    )
    .join("");
}

function getAttachment(id) {
  return attachmentDatabase.find((attachment) => attachment.id === id);
}

function renderAttachmentCard(item) {
  const attachment = getAttachment(item.attachmentId);
  if (!attachment) {
    return `
      <div class="attachment-card">
        <div class="attachment-head">
          <span>${escapeHtml(item.slot || "未标注槽位")}</span>
          <strong>未知配件</strong>
        </div>
      </div>
    `;
  }

  const allEffects = [
    ...(attachment.effects || []),
    ...(attachment.conditionalEffects || []).flatMap((group) =>
      group.effects.map((effect) => ({ ...effect, condition: group.condition }))
    )
  ];
  const calibration = attachment.calibration;

  return `
    <div class="attachment-card">
      <div class="attachment-head">
        <span>${escapeHtml(item.slot || attachment.slot)}</span>
        <strong>${escapeHtml(attachment.name)}</strong>
      </div>
      <div class="effect-list">
        ${allEffects
          .map(
            (effect) => `
            <span class="effect-pill ${effect.type}">
              ${escapeHtml(effect.condition ? `${effect.condition}：` : "")}${escapeHtml(effect.value || "")}${escapeHtml(effect.stat)}
            </span>
          `
          )
          .join("")}
      </div>
      ${
        calibration
          ? `
          <div class="calibration-block">
            <span>精校</span>
            <div class="effect-list">
              ${calibration.sliders
                .map((slider) => `<span class="effect-pill neutral">${escapeHtml(slider.label)} ${escapeHtml(slider.value)}</span>`)
                .join("")}
              ${calibration.effects
                .map(
                  (effect) =>
                    `<span class="effect-pill ${effect.type}">${escapeHtml(effect.value)} ${escapeHtml(effect.stat)}</span>`
                )
                .join("")}
            </div>
          </div>
        `
          : ""
      }
    </div>
  `;
}

function openDialog(build = null) {
  state.editingId = build?.id || null;
  els.dialogTitle.textContent = build ? "编辑配置" : "新增配置";
  els.form.weapon.value = build?.weapon || "";
  els.form.category.value = build?.category || "步枪";
  els.form.title.value = build?.title || "";
  els.form.mode.value = build?.mode || "";
  els.form.code.value = build?.code || "";
  els.form.parts.value = build?.parts?.join(", ") || "";
  els.form.note.value = build?.note || "";
  els.form.rating.value = build?.rating || 8;
  els.form.shared.checked = build?.shared ?? true;
  els.dialog.showModal();
}

function saveFromForm() {
  const data = new FormData(els.form);
  const parts = String(data.get("parts") || "")
    .split(/[,，]/)
    .map((part) => part.trim())
    .filter(Boolean);

  const nextBuild = {
    id: state.editingId || crypto.randomUUID(),
    weapon: String(data.get("weapon")).trim(),
    category: String(data.get("category")).trim(),
    title: String(data.get("title")).trim(),
    mode: String(data.get("mode")).trim(),
    code: String(data.get("code")).trim(),
    parts,
    attachments: state.builds.find((build) => build.id === state.editingId)?.attachments || [],
    stats: state.builds.find((build) => build.id === state.editingId)?.stats || [],
    note: String(data.get("note")).trim(),
    rating: Number(data.get("rating")) || 8,
    shared: data.get("shared") === "on",
    favorite: state.builds.find((build) => build.id === state.editingId)?.favorite || false,
    createdAt: state.builds.find((build) => build.id === state.editingId)?.createdAt || Date.now()
  };

  if (state.editingId) {
    state.builds = state.builds.map((build) => (build.id === state.editingId ? nextBuild : build));
  } else {
    state.builds = [nextBuild, ...state.builds];
  }

  state.selectedId = nextBuild.id;
  persist();
  render();
  els.dialog.close();
  showToast("已保存配置");
}

async function copyText(text, message = "已复制") {
  await navigator.clipboard.writeText(text);
  showToast(message);
}

function getShareText(build) {
  return [
    `【三角洲改枪库】${build.weapon} · ${build.title}`,
    `类型：${build.category}`,
    `玩法：${build.mode || "未标注"}`,
    `评分：${build.rating}/10`,
    `改枪码：${build.code}`,
    build.parts?.length ? `配件：${build.parts.join(" / ")}` : "",
    build.attachments?.length
      ? `配件数据：${build.attachments
          .map((item) => {
            const attachment = getAttachment(item.attachmentId);
            return `${item.slot}=${attachment?.name || item.attachmentId}`;
          })
          .join(" / ")}`
      : "",
    build.stats?.length
      ? `属性：${build.stats.map((stat) => `${stat.label}${stat.value}`).join(" / ")}`
      : "",
    build.note ? `备注：${build.note}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

els.segments.forEach((button) => {
  button.addEventListener("click", () => {
    els.segments.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    state.type = button.dataset.type;
    render();
  });
});

els.navItems.forEach((button) => {
  button.addEventListener("click", () => {
    els.navItems.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    state.collection = button.dataset.filterCollection;
    render();
  });
});

els.buildList.addEventListener("click", (event) => {
  const copyTarget = event.target.closest("[data-copy-id]");
  if (copyTarget) {
    event.stopPropagation();
    const build = state.builds.find((item) => item.id === copyTarget.dataset.copyId);
    if (build) copyText(build.code, "改枪码已复制");
    return;
  }

  const card = event.target.closest(".build-card");
  if (!card) return;
  state.selectedId = card.dataset.id;
  render();
});

els.newBuildBtn.addEventListener("click", () => openDialog());
els.closeDialogBtn.addEventListener("click", () => els.dialog.close());
els.cancelBtn.addEventListener("click", () => els.dialog.close());

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  saveFromForm();
});

els.favoriteBtn.addEventListener("click", () => {
  state.builds = state.builds.map((build) =>
    build.id === state.selectedId ? { ...build, favorite: !build.favorite } : build
  );
  persist();
  render();
});

els.copyDetailBtn.addEventListener("click", () => {
  const build = state.builds.find((item) => item.id === state.selectedId);
  if (build) copyText(build.code, "改枪码已复制");
});

els.copyShareBtn.addEventListener("click", () => {
  const build = state.builds.find((item) => item.id === state.selectedId);
  if (build) copyText(getShareText(build), "分享文本已复制");
});

els.editBtn.addEventListener("click", () => {
  const build = state.builds.find((item) => item.id === state.selectedId);
  if (build) openDialog(build);
});

els.deleteBtn.addEventListener("click", () => {
  const build = state.builds.find((item) => item.id === state.selectedId);
  if (!build) return;
  const confirmed = window.confirm(`删除「${build.weapon} · ${build.title}」？`);
  if (!confirmed) return;
  state.builds = state.builds.filter((item) => item.id !== build.id);
  state.selectedId = null;
  persist();
  render();
  showToast("已删除配置");
});

els.exportBtn.addEventListener("click", () => {
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    builds: state.builds,
    attachments: attachmentDatabase
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `delta-arsenal-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("已导出 JSON");
});

els.importFile.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());
    const importedBuilds = Array.isArray(imported) ? imported : imported.builds;
    if (!Array.isArray(importedBuilds)) throw new Error("Invalid file");
    state.builds = mergeBuiltIns(importedBuilds.map(normalizeBuild));
    state.selectedId = state.builds[0]?.id || null;
    persist();
    render();
    showToast("导入完成");
  } catch {
    showToast("导入失败，请检查 JSON");
  } finally {
    event.target.value = "";
  }
});

persist();
render();
