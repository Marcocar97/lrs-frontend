import React from "react";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  COMMON_BEFORE_ROOF,
  FULLY_PRIMED_SURFACES,
  TWENTY_FIVE_YEAR_AFTER_ROOF,
  TWENTY_FIVE_YEAR_PRIMER,
  TWENTY_YEAR_AFTER_ROOF,
  TWENTY_YEAR_PRIMER,
} from "./fastCoatTopContent";

const styles = StyleSheet.create({
  page: {
    width: 595.28,
    height: 841.89,
    paddingTop: 88,
    paddingRight: 42,
    paddingBottom: 82,
    paddingLeft: 42,
    color: "#000000",
    fontFamily: "Helvetica",
    fontSize: 9.2,
    lineHeight: 1.28,
  },
  coverPage: {
    width: 595.28,
    height: 841.89,
    padding: 0,
    backgroundColor: "#ffffff",
  },
  coverTopImage: {
    width: "100%",
  },
  coverContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    paddingHorizontal: 48,
    textAlign: "center",
  },
  coverLogo: {
    width: 285,
    height: 82,
    objectFit: "contain",
    marginBottom: 24,
  },
  coverTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 25,
    lineHeight: 1.15,
    color: "#231f20",
    marginBottom: 16,
    textAlign: "center",
  },
  coverReference: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
  },
  header: {
    position: "absolute",
    top: 28,
    left: 42,
    right: 42,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 11.5,
    color: "#666666",
  },
  colourBars: {
    flexDirection: "row",
  },
  redBar: {
    width: 42,
    height: 4,
    marginLeft: 5,
    backgroundColor: "#ef4136",
  },
  orangeBar: {
    width: 42,
    height: 4,
    marginLeft: 5,
    backgroundColor: "#f7931e",
  },
  greenBar: {
    width: 42,
    height: 4,
    marginLeft: 5,
    backgroundColor: "#39b54a",
  },
  headerDivider: {
    height: 0.7,
    marginTop: 10,
    backgroundColor: "#3b3b3b",
  },
  footer: {
    position: "absolute",
    bottom: 12,
    left: 42,
    right: 42,
    height: 54,
  },
  footerDivider: {
    height: 0.6,
    marginBottom: 5,
    backgroundColor: "#bcbcbc",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLrsLogo: {
    width: 86,
    height: 35,
    objectFit: "contain",
  },
  pageNumber: {
    width: 100,
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    textAlign: "center",
    color: "#333333",
  },
  footerFastCoatLogo: {
    width: 142,
    height: 35,
    objectFit: "contain",
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    lineHeight: 1.2,
    marginTop: 7,
    marginBottom: 7,
    color: "#231f20",
  },
  subsectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.6,
    lineHeight: 1.25,
    marginTop: 3.5,
    marginBottom: 2,
  },
  paragraph: {
    fontSize: 9.2,
    lineHeight: 1.28,
    marginBottom: 3.2,
    textAlign: "left",
  },
  bullet: {
    marginLeft: 13,
    paddingRight: 4,
  },
  nestedBullet: {
    marginLeft: 27,
    paddingRight: 4,
  },
  contentsTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    color: "#231f20",
  },
  contentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    marginBottom: 6,
    borderBottomWidth: 0.7,
    borderBottomColor: "#555555",
  },
  contentsHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },
  contentsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  contentsLabel: {
    width: "88%",
    fontSize: 9.2,
  },
  contentsPage: {
    width: "12%",
    fontSize: 9.2,
    textAlign: "right",
  },
  specificationTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    lineHeight: 1.2,
    marginBottom: 24,
    color: "#231f20",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 9,
  },
  detailLabel: {
    width: "34%",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  detailValue: {
    width: "66%",
    fontSize: 10,
  },
  roofIntro: {
    fontSize: 9.2,
    lineHeight: 1.28,
    marginBottom: 8,
  },
  roofImageFrame: {
    width: "100%",
    height: 255,
    marginTop: 6,
    marginBottom: 10,
    padding: 4,
    borderWidth: 0.6,
    borderColor: "#bdbdbd",
    justifyContent: "center",
    alignItems: "center",
  },
  roofImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  roofTable: {
    marginTop: 4,
    marginBottom: 9,
    borderTopWidth: 0.6,
    borderTopColor: "#777777",
  },
  roofRow: {
    flexDirection: "row",
    paddingVertical: 3,
    borderBottomWidth: 0.35,
    borderBottomColor: "#d0d0d0",
  },
  roofLabel: {
    width: "34%",
    fontFamily: "Helvetica-Bold",
  },
  roofValue: {
    width: "66%",
  },
  photosTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    marginBottom: 9,
  },
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photoBox: {
    width: "48.5%",
    height: 145,
    marginBottom: 7,
    padding: 4,
    borderWidth: 0.6,
    borderColor: "#bdbdbd",
    justifyContent: "center",
    alignItems: "center",
  },
  singlePhotoBox: {
    width: "100%",
    height: 250,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  materialsLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    marginBottom: 4,
  },
  finalSection: {
    marginTop: 8,
  },
  signoffTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginTop: 8,
    marginBottom: 6,
  },
  signoff: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  signoffColumn: {
    width: "47%",
  },
  signature: {
    width: 115,
    height: 30,
    objectFit: "contain",
    marginBottom: 4,
  },
  contactName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    marginBottom: 1,
  },
  contactText: {
    fontSize: 7.8,
    marginBottom: 1,
  },
  backCoverPage: {
    width: 595.28,
    height: 841.89,
    padding: 0,
    backgroundColor: "#ffffff",
  },
  backCoverImage: {
    width: "100%",
  },
  backCoverContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 28,
    paddingRight: 58,
    paddingLeft: 58,
  },
  backCoverHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    color: "#f5a623",
    marginBottom: 8,
  },
  backCoverText: {
    fontSize: 10.5,
    marginBottom: 3,
  },
  backCoverWebsite: {
    fontSize: 10.5,
    color: "#f5a623",
  },
  backCoverLogo: {
    width: 105,
    height: 58,
    objectFit: "contain",
  },
});

const SECTION_HEADINGS = new Set([
  "Preliminaries and General Conditions",
  "Waterproofing Only",
  "Measuring the Roof",
  "Existing Falls",
  "Change is Scope of Works",
  "Existing Roof Condition",
  "Natural Growth/Vegetation",
  "Adhesion Test",
  "Compliance with Building Regulations",
  "Flat Roof Detailing Guidance",
  "CDM",
  "Safety Precautions",
  "Preparation",
  "Cleaning",
  "799 Wash N Prep",
  "TV Aerials and Satellite Dish Arrays",
  "Cables",
  "Waterproofing Coverings",
  "MS 2-Part Primer:",
  "Existing Details, Terminations and Upstands:",
  "FastCoat Waterproof as a Base Coat:",
  "FastCoat Waterproof as a BaseCoat:",
  "FastCoat Base Coat – Inspect:",
  "Steps for Inspecting and Repairing FastCoat Waterproof",
  "FastCoat MidCoat:",
  "FastCoat Waterproof as a MidCoat:",
  "FastCoat Waterproof as a TopCoat:",
  "Completed Roof Surface",
  "Guide to Visual Inspection of the Completed Roof Surface",
  "Traffic Coat Previsions for walkways, maintenance routes etc.:",
  "General Guidance and Requirements",
  "General Guidance - requirements",
  "Maintenance After Installation",
]);

const MAJOR_HEADINGS = new Set([
  "Preliminaries and General Conditions",
  "Preparation",
  "Cleaning",
  "Waterproofing Coverings",
  "MS 2-Part Primer:",
  "Existing Details, Terminations and Upstands:",
  "FastCoat Waterproof as a Base Coat:",
  "FastCoat Waterproof as a BaseCoat:",
  "FastCoat Base Coat – Inspect:",
  "FastCoat MidCoat:",
  "FastCoat Waterproof as a MidCoat:",
  "FastCoat Waterproof as a TopCoat:",
  "Completed Roof Surface",
  "Guide to Visual Inspection of the Completed Roof Surface",
  "Traffic Coat Previsions for walkways, maintenance routes etc.:",
  "General Guidance and Requirements",
  "General Guidance - requirements",
  "Maintenance After Installation",
]);

const TOC_KEYS = {
  "Preliminaries and General Conditions": "preliminaries",
  "Existing Falls": "existingFalls",
  "Natural Growth/Vegetation": "naturalGrowth",
  "Flat Roof Detailing Guidance": "flatRoof",
  "Roof Specification": "roofSpecification",
  "The Roof Build Up": "roofBuildUp",
  Cleaning: "cleaning",
  "Waterproofing Coverings": "waterproof",
  "Completed Roof Surface": "additional",
  "General Guidance and Requirements": "general",
};

const asset = (assetBase, filename) =>
  assetBase ? assetBase.replace(/\/$/, "") + "/" + filename : "/" + filename;

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value + "T00:00:00");
  if (Number.isNaN(date.getTime())) return value;

  const day = date.getDate();
  const suffix =
    day % 100 >= 11 && day % 100 <= 13
      ? "th"
      : day % 10 === 1
        ? "st"
        : day % 10 === 2
          ? "nd"
          : day % 10 === 3
            ? "rd"
            : "th";

  return (
    day +
    suffix +
    " " +
    date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })
  );
};

const Header = ({ surface }) => (
  <View style={styles.header} fixed>
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>FastCoat onto {surface}</Text>
      <View style={styles.colourBars}>
        <View style={styles.redBar} />
        <View style={styles.orangeBar} />
        <View style={styles.greenBar} />
      </View>
    </View>
    <View style={styles.headerDivider} />
  </View>
);

const Footer = ({ assetBase, pageNumber }) => (
  <View style={styles.footer} fixed>
    <View style={styles.footerDivider} />
    <View style={styles.footerRow}>
      <Image src={asset(assetBase, "1lrs.png")} style={styles.footerLrsLogo} />
      <Text style={styles.pageNumber}>Page {pageNumber}</Text>
      <Image
        src={asset(assetBase, "fastcoat-pro-footer.png")}
        style={styles.footerFastCoatLogo}
      />
    </View>
  </View>
);

const joinText = (left, right) =>
  left.endsWith("-") ? left + right : left + " " + right;

const classifyLine = (line) => {
  if (SECTION_HEADINGS.has(line)) {
    return MAJOR_HEADINGS.has(line) ? "majorHeading" : "heading";
  }
  if (/^\d+\.\s+/.test(line)) return "numbered";
  if (line.startsWith("•")) return "bullet";
  if (/^o\s/.test(line)) return "nestedBullet";
  if (/^[^•o].{0,90}:$/.test(line) && !line.startsWith("http")) {
    return "heading";
  }
  return "paragraph";
};

const shouldJoin = (previous, lineType, line) => {
  if (!previous || lineType !== "paragraph") return false;
  if (!["paragraph", "bullet", "nestedBullet", "numbered"].includes(previous.type)) {
    return false;
  }

  const previousEndsSentence = /[.!?]$/.test(previous.text.trim());
  const beginsLowerCase = /^[a-z]/.test(line);
  return !previousEndsSentence || beginsLowerCase;
};

const toBlocks = (lines) => {
  const blocks = [];

  lines.forEach((line) => {
    if (!line || line === "[[PAGE_GAP]]") return;

    const type = classifyLine(line);
    const previous = blocks[blocks.length - 1];

    if (shouldJoin(previous, type, line)) {
      previous.text = joinText(previous.text, line);
      return;
    }

    blocks.push({ type, text: line });
  });

  return blocks;
};

const renderBlock = (block, index, prefix) => {
  const isHeading = block.type === "heading" || block.type === "numbered";

  return (
    <Text
      key={`${prefix}-${index}`}
      style={[
        block.type === "majorHeading" ? styles.sectionTitle : styles.paragraph,
        isHeading && styles.subsectionTitle,
        block.type === "bullet" && styles.bullet,
        block.type === "nestedBullet" && styles.nestedBullet,
      ]}
      minPresenceAhead={
        block.type === "majorHeading" ? 42 : isHeading ? 22 : 0
      }
    >
      {block.text}
    </Text>
  );
};

const estimateWrappedLines = (text, maxCharacters) => {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  if (!words.length) return 1;

  let lines = 1;
  let currentLength = 0;

  words.forEach((word) => {
    const nextLength = currentLength ? currentLength + 1 + word.length : word.length;
    if (nextLength > maxCharacters && currentLength > 0) {
      lines += 1;
      currentLength = word.length;
    } else {
      currentLength = nextLength;
    }
  });

  return lines;
};

const estimateBlockHeight = (block) => {
  if (block.type === "majorHeading") {
    return estimateWrappedLines(block.text, 68) * 17 + 14;
  }
  if (block.type === "heading" || block.type === "numbered") {
    return estimateWrappedLines(block.text, 92) * 12.2 + 6;
  }

  const maxCharacters =
    block.type === "nestedBullet" ? 92 : block.type === "bullet" ? 98 : 106;
  return estimateWrappedLines(block.text, maxCharacters) * 11.8 + 3.5;
};

const estimateRoofDetailsHeight = (rows) =>
  rows.reduce((height, [label, value]) => {
    const labelLines = estimateWrappedLines(label, 30);
    const valueLines = estimateWrappedLines(value || "TBC", 66);
    return height + Math.max(labelLines, valueLines) * 11.8 + 6;
  }, 14);

const estimateItemHeight = (item) => {
  if (item.kind === "block") return estimateBlockHeight(item.block);
  if (item.kind === "roofImage") return 271;
  if (item.kind === "roofDetails") {
    return estimateRoofDetailsHeight(item.rows);
  }
  if (item.kind === "finalSections") {
    const photoCount = item.photos.length;
    const photoHeight =
      photoCount === 0
        ? 0
        : 29 + (photoCount === 1 ? 257 : photoCount === 2 ? 152 : 304);
    return photoHeight + 172;
  }
  return 0;
};

const paginateContentItems = (items, startPage = 4) => {
  const maximumHeight = 638;
  const pages = [];
  const pageStarts = {};
  let page = [];
  let usedHeight = 0;

  const savePage = () => {
    if (!page.length) return;
    pages.push(page);
    page = [];
    usedHeight = 0;
  };

  items.forEach((item, index) => {
    const itemHeight = estimateItemHeight(item);
    const nextItem = items[index + 1];
    const keepWithNext =
      item.kind === "block" &&
      ["majorHeading", "heading", "numbered"].includes(item.block.type) &&
      nextItem;
    const requiredHeight = keepWithNext
      ? itemHeight + Math.min(estimateItemHeight(nextItem), 72) + 36
      : itemHeight;

    if (page.length && usedHeight + requiredHeight > maximumHeight) {
      savePage();
    }

    const tocKeys = [item.tocKey, ...(item.tocKeys || [])].filter(Boolean);
    tocKeys.forEach((tocKey) => {
      if (pageStarts[tocKey] == null) {
        pageStarts[tocKey] = startPage + pages.length;
      }
    });

    page.push(item);
    usedHeight += itemHeight;
  });

  savePage();
  return { pages, pageStarts };
};

const getConditionalContent = ({ guarantee, isFullyPrimed, trafficCoat }) => {
  const source =
    guarantee === "25-year"
      ? TWENTY_FIVE_YEAR_AFTER_ROOF
      : TWENTY_YEAR_AFTER_ROOF;
  const primer =
    guarantee === "25-year" ? TWENTY_FIVE_YEAR_PRIMER : TWENTY_YEAR_PRIMER;
  const lines = [];
  let insideTrafficSection = false;

  source.forEach((line) => {
    if (line === "[[TRAFFIC_START]]") {
      insideTrafficSection = true;
      return;
    }
    if (line === "[[TRAFFIC_END]]") {
      insideTrafficSection = false;
      return;
    }
    if (insideTrafficSection && trafficCoat !== "Yes") return;

    lines.push(line);

    if (line === "Waterproofing Coverings" && isFullyPrimed) {
      lines.push(...primer);
    }
  });

  const guaranteeIndex = lines.indexOf("Guarantee – Materials Only");

  return {
    body:
      guaranteeIndex === -1 ? lines : lines.slice(0, guaranteeIndex),
    guarantee:
      guaranteeIndex === -1 ? [] : lines.slice(guaranteeIndex + 1),
  };
};

const Contents = ({ pageStarts, showPhotographs }) => {
  const rows = [
    ["Project details", pageStarts.project],
    ["Preliminaries & general conditions", pageStarts.preliminaries],
    [
      "Existing falls, change in scope of works, existing roof condition",
      pageStarts.existingFalls,
    ],
    [
      "Natural growth, adhesion test, compliance with building regulations",
      pageStarts.naturalGrowth,
    ],
    ["Flat roof detailing guidance & CDM", pageStarts.flatRoof],
    ["Roof specification", pageStarts.roofSpecification],
    ["The roof build-up and preparation", pageStarts.roofBuildUp],
    ["Cleaning, TV, satellite arrays, cables", pageStarts.cleaning],
    ["Waterproof coverings", pageStarts.waterproof],
    ["Additional information", pageStarts.additional],
    ["General guidance and requirements", pageStarts.general],
    ...(showPhotographs
      ? [["Photographs", pageStarts.photographs]]
      : []),
    ["Materials and guarantee", pageStarts.materials],
    ["Guarantee", pageStarts.materials],
  ];

  return (
    <>
      <View style={styles.contentsHeader}>
        <Text style={styles.contentsTitle}>Contents</Text>
        <Text style={styles.contentsHeaderText}>Page</Text>
      </View>
      {rows.map(([label, page]) => (
        <View key={label} style={styles.contentsRow}>
          <Text style={styles.contentsLabel}>{label}</Text>
          <Text style={styles.contentsPage}>{page}</Text>
        </View>
      ))}
    </>
  );
};

const getRoofRows = ({
  reference,
  roofSize,
  roofType,
  roofBuildUp,
  uValue,
  outlets,
  skylights,
  acUnits,
  existingCoatings,
  pondingWater,
}) => [
  ["Project Reference", reference],
  ["Roof Size", roofSize],
  ["Roof Type", roofType],
  ["Roof Build Up", roofBuildUp],
  ...(roofType === "Warm Roof" ? [["U Value Needed", uValue]] : []),
  ["Outlets", outlets],
  ["Skylights", skylights],
  ["AC Units", acUnits],
  ["Existing Coatings", existingCoatings],
  ["Ponding Water", pondingWater],
];

const RoofDetails = (props) => {
  const rows = getRoofRows(props);

  return (
    <View style={styles.roofTable} wrap={false}>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.roofRow}>
          <Text style={styles.roofLabel}>{label}</Text>
          <Text style={styles.roofValue}>{value || "TBC"}</Text>
        </View>
      ))}
    </View>
  );
};

const MaterialsAndGuarantee = ({ guaranteeBlocks, assetBase }) => (
  <View style={styles.finalSection} wrap={false}>
    <Text style={styles.materialsLabel}>Materials</Text>
    <Text style={[styles.paragraph, { marginBottom: 8 }]}>TBC</Text>

    <Text style={styles.materialsLabel}>Guarantee:</Text>
    {guaranteeBlocks.map((block, index) =>
      renderBlock(block, index, "guarantee"),
    )}

    <Text style={styles.signoffTitle}>Kind Regards</Text>
    <View style={styles.signoff}>
      <View style={styles.signoffColumn}>
        <Image
          src={asset(assetBase, "firma.png")}
          style={styles.signature}
        />
        <Text style={styles.contactName}>Paul Jones</Text>
        <Text style={styles.contactText}>LRS Technical Manager</Text>
        <Text style={styles.contactText}>T: 01948 841 877</Text>
        <Text style={styles.contactText}>E: paul.jones@lrs-systems.co.uk</Text>
        <Text style={styles.contactText}>W: www.lrs-systems.co.uk</Text>
      </View>

      <View style={styles.signoffColumn}>
        <Image
          src={asset(assetBase, "firmat.png")}
          style={styles.signature}
        />
        <Text style={styles.contactName}>Tom Shone</Text>
        <Text style={styles.contactText}>Managing Director</Text>
        <Text style={styles.contactText}>T: 07415 116280</Text>
        <Text style={styles.contactText}>E: tomshone@lrs-systems.co.uk</Text>
        <Text style={styles.contactText}>W: www.lrs-systems.co.uk</Text>
      </View>
    </View>
  </View>
);

const FinalSections = ({ photos, guaranteeBlocks, assetBase }) => (
  <View wrap={false}>
    {photos.length > 0 ? (
      <>
        <Text style={styles.photosTitle}>Photographs</Text>
        <View style={styles.photosGrid}>
          {photos.map((photo, index) => (
            <View
              key={`photograph-${index}`}
              style={[
                styles.photoBox,
                photos.length === 1 && styles.singlePhotoBox,
              ]}
            >
              <Image src={photo} style={styles.photo} />
            </View>
          ))}
        </View>
      </>
    ) : null}

    <MaterialsAndGuarantee
      guaranteeBlocks={guaranteeBlocks}
      assetBase={assetBase}
    />
  </View>
);

const BackCover = ({ assetBase }) => (
  <Page size="A4" style={styles.backCoverPage}>
    <Image src={asset(assetBase, "2F.png")} style={styles.backCoverImage} />
    <View style={styles.backCoverContent}>
      <View>
        <Text style={styles.backCoverHeading}>LIQUID ROOFING SYSTEMS LTD</Text>
        <Text style={styles.backCoverText}>
          Roofing House, Prees Green, Whitchurch, SY13 2BN
        </Text>
        <Text style={styles.backCoverText}>01948 841 877</Text>
        <Text style={styles.backCoverText}>enquiries@lrs-systems.co.uk</Text>
        <Text style={styles.backCoverWebsite}>www.lrs-systems.co.uk</Text>
      </View>
      <Image
        src={asset(assetBase, "1lrs.png")}
        style={styles.backCoverLogo}
      />
    </View>
  </Page>
);

const PdfDocumentFastCoatTop = ({
  reference,
  date,
  roofSize,
  attention,
  preparedBy = "Paul Jones",
  preparedByRole = "Technical Manager",
  preparedByPhone = "T: 01948 841 877",
  preparedByEmail = "E: paul.jones@lrs-systems.co.uk",
  guarantee = "20-year",
  surface = "Timber",
  image,
  lrsReference,
  roofType,
  uValue,
  outlets,
  skylights,
  acUnits,
  existingCoatings,
  pondingWater,
  trafficCoat,
  antiSkid,
  photos = [],
  roofBuildUp,
  assetBase = "",
  pageStarts,
}) => {
  const isFullyPrimed = FULLY_PRIMED_SURFACES.includes(surface);
  const selectedTrafficCoat = trafficCoat || antiSkid || "No";
  const selectedContent = getConditionalContent({
    guarantee,
    isFullyPrimed,
    trafficCoat: selectedTrafficCoat,
  });
  const contentBlocks = toBlocks(COMMON_BEFORE_ROOF);
  const afterRoofBlocks = toBlocks(selectedContent.body);
  const guaranteeBlocks = toBlocks(selectedContent.guarantee);
  const guaranteeYears = guarantee === "25-year" ? "25" : "20";
  const safePhotos = Array.isArray(photos)
    ? photos.filter(Boolean).slice(0, 4)
    : [];
  const roofDetailsProps = {
    reference,
    roofSize,
    roofType,
    roofBuildUp,
    uValue,
    outlets,
    skylights,
    acUnits,
    existingCoatings,
    pondingWater,
  };
  const roofRows = getRoofRows(roofDetailsProps);
  const blockItem = (block) => ({
    kind: "block",
    block,
    tocKey: TOC_KEYS[block.text],
  });
  const contentItems = [
    blockItem({
      type: "majorHeading",
      text: "Preliminaries and General Conditions",
    }),
    ...contentBlocks.map(blockItem),
    blockItem({ type: "majorHeading", text: "Roof Specification" }),
    blockItem({
      type: "paragraph",
      text: `Roof areas covered in this specification: ${reference || "TBC"}`,
    }),
    ...(image ? [{ kind: "roofImage", source: image }] : []),
    blockItem({ type: "majorHeading", text: "The Roof Build Up" }),
    blockItem({
      type: "paragraph",
      text: `With the information and images provided this specification is for ${reference || "TBC"}.`,
    }),
    {
      kind: "roofDetails",
      rows: roofRows,
      props: roofDetailsProps,
    },
    ...afterRoofBlocks.map(blockItem),
    {
      kind: "finalSections",
      photos: safePhotos,
      tocKeys: [
        ...(safePhotos.length > 0 ? ["photographs"] : []),
        "materials",
      ],
    },
  ];
  const pagination = paginateContentItems(contentItems);
  const computedPageStarts = {
    project: 3,
    ...pagination.pageStarts,
  };
  const resolvedPageStarts = {
    ...computedPageStarts,
    ...(pageStarts || {}),
  };

  return (
    <Document
      title={`FastCoat TopCoat - ${reference || "Installation Specification"}`}
      author="Liquid Roofing Systems Ltd"
    >
      <Page size="A4" style={styles.coverPage}>
        <Image
          src={asset(assetBase, "1F.png")}
          style={styles.coverTopImage}
        />
        <View style={styles.coverContent}>
          <Image
            src={asset(assetBase, "fastcoat-pro-footer.png")}
            style={styles.coverLogo}
          />
          <Text style={styles.coverTitle}>INSTALLATION SPECIFICATION</Text>
          <Text style={styles.coverReference}>
            {(reference || "PROJECT REFERENCE").toUpperCase()}
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header surface={surface} />
        <Contents
          pageStarts={resolvedPageStarts}
          showPhotographs={safePhotos.length > 0}
        />
        <Text style={[styles.paragraph, { marginTop: 12 }]}>
          FastCoat Pro {guaranteeYears} Specification Ref: {lrsReference || "LRS – TBC"}
        </Text>
        <Footer assetBase={assetBase} pageNumber={2} />
      </Page>

      <Page size="A4" style={styles.page}>
        <Header surface={surface} />
        <Text style={styles.specificationTitle}>
          FastCoat Pro {guaranteeYears} Specification Ref: {lrsReference || "LRS – TBC"}
        </Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{formatDate(date) || "TBC"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Project reference</Text>
          <Text style={styles.detailValue}>{reference || "TBC"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Roof size</Text>
          <Text style={styles.detailValue}>{roofSize || "TBC"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>For the attention of</Text>
          <Text style={styles.detailValue}>{attention || "TBC"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Prepared by</Text>
          <View style={styles.detailValue}>
            <Text>{preparedBy}</Text>
            <Text>{preparedByRole}</Text>
            <Text>{preparedByPhone}</Text>
            <Text>{preparedByEmail}</Text>
          </View>
        </View>
        <Footer assetBase={assetBase} pageNumber={3} />
      </Page>

      {pagination.pages.map((items, pageIndex) => {
        const currentPageNumber = 4 + pageIndex;

        return (
          <Page
            key={`content-page-${currentPageNumber}`}
            size="A4"
            style={styles.page}
          >
            <Header surface={surface} />

            {items.map((item, itemIndex) => {
              if (item.kind === "block") {
                return renderBlock(
                  item.block,
                  itemIndex,
                  `page-${currentPageNumber}`,
                );
              }

              if (item.kind === "roofImage") {
                return (
                  <View
                    key={`roof-image-${currentPageNumber}-${itemIndex}`}
                    style={styles.roofImageFrame}
                    wrap={false}
                  >
                    <Image src={item.source} style={styles.roofImage} />
                  </View>
                );
              }

              if (item.kind === "roofDetails") {
                return (
                  <RoofDetails
                    key={`roof-details-${currentPageNumber}-${itemIndex}`}
                    {...item.props}
                  />
                );
              }

              if (item.kind === "finalSections") {
                return (
                  <FinalSections
                    key={`final-sections-${currentPageNumber}-${itemIndex}`}
                    photos={item.photos}
                    guaranteeBlocks={guaranteeBlocks}
                    assetBase={assetBase}
                  />
                );
              }

              return null;
            })}

            <Footer
              assetBase={assetBase}
              pageNumber={currentPageNumber}
            />
          </Page>
        );
      })}

      <BackCover assetBase={assetBase} />
    </Document>
  );
};

export default PdfDocumentFastCoatTop;