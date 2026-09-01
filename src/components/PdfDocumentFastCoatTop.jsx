// VERSION: 2026-09-01-a4-flow-layout-fixed-v5
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

// A4 portrait dimensions in PDF points (72 pt per inch). Using one shared
// value guarantees that every physical page and every wrapped continuation
// page uses the same MediaBox.
const A4_PAGE_SIZE = [595.28, 841.89];

// IMPORTANT:
// The physical PDF MediaBox is controlled ONLY by A4_PAGE_SIZE on <Page>.
// Do not add width/height to styles.page, styles.coverPage or styles.backCoverPage.
// Pagination/blank-space fixes must only change content flow, wrapping and spacing.
const styles = StyleSheet.create({
  page: {
    paddingTop: 88,
    paddingRight: 42,
    paddingBottom: 82,
    paddingLeft: 42,
    color: "#000000",
    fontFamily: "Helvetica",
    fontSize: 9.8,
    lineHeight: 1.32,
  },
  coverPage: {
    padding: 0,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  coverTopImage: {
    width: "100%",
    height: "42%",
    objectFit: "cover",
  },
  coverContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 28,
    paddingBottom: 28,
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
    fontSize: 14.6,
    lineHeight: 1.22,
    marginTop: 10,
    marginBottom: 8,
    color: "#231f20",
  },
  subsectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.2,
    lineHeight: 1.28,
    marginTop: 5.5,
    marginBottom: 3.5,
  },
  paragraph: {
    fontSize: 9.8,
    lineHeight: 1.32,
    marginBottom: 4.5,
    textAlign: "left",
  },
  bullet: {
    marginLeft: 14,
    paddingRight: 4,
  },
  nestedBullet: {
    marginLeft: 28,
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

  roofImageFrame: {
    width: "100%",
    height: 285,
    marginTop: 8,
    marginBottom: 12,
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
  roofTableContinuation: {
    marginTop: 0,
    marginBottom: 9,
  },
  roofRow: {
    flexDirection: "row",
    paddingVertical: 3.8,
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
    fontSize: 15.5,
    marginBottom: 12,
  },
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photoBox: {
    width: "48.5%",
    height: 235,
    marginBottom: 10,
    padding: 4,
    borderWidth: 0.6,
    borderColor: "#bdbdbd",
    justifyContent: "center",
    alignItems: "center",
  },
  singlePhotoBox: {
    width: "100%",
    height: 480,
  },
  twoPhotoBox: {
    height: 440,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  materialsArea: {
    marginTop: 14,
  },
  materialsLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    marginBottom: 5,
  },

  guaranteeSection: {
    marginTop: 4,
  },
  signoffTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.2,
    marginTop: 18,
    marginBottom: 10,
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
    width: 125,
    height: 34,
    objectFit: "contain",
    marginBottom: 6,
  },
  contactName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.2,
    marginBottom: 2,
  },
  contactText: {
    fontSize: 8.6,
    marginBottom: 1.5,
  },

  backCoverPage: {
    padding: 0,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  backCoverImage: {
    width: "100%",
    height: "52%",
    objectFit: "cover",
  },
  backCoverContent: {
    flexGrow: 1,
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

  // Essentially invisible, but it remains in normal document flow so React
  // PDF reports the page on which that section actually starts.
  sectionMarker: {
    fontSize: 0.1,
    lineHeight: 0.1,
    height: 0.1,
    margin: 0,
    padding: 0,
    color: "#ffffff",
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
  "Guarantee – Materials Only",
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

const INTERNAL_PAGE_KEYS = {
  Preparation: "preparation",
  "Safety Precautions": "safety",
  Cleaning: "cleaning",
  "MS 2-Part Primer:": "primer",
  "Existing Details, Terminations and Upstands:": "details",
  "FastCoat Waterproof as a Base Coat:": "baseCoat",
  "FastCoat Waterproof as a BaseCoat:": "baseCoat",
  "FastCoat Base Coat – Inspect:": "baseCoatInspect",
  "FastCoat MidCoat:": "midCoat",
  "FastCoat Waterproof as a MidCoat:": "midCoat",
  "FastCoat Waterproof as a TopCoat:": "topCoat",
  "Completed Roof Surface": "completedRoof",
  "Guide to Visual Inspection of the Completed Roof Surface": "visualInspection",
  "Traffic Coat Previsions for walkways, maintenance routes etc.": "trafficCoat",
  "Traffic Coat Previsions for walkways, maintenance routes etc.:": "trafficCoat",
  "General Guidance and Requirements": "generalGuidance",
  "Maintenance After Installation": "maintenance",
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
      <Text style={styles.headerTitle}>FastCoat Pro onto {surface}</Text>
      <View style={styles.colourBars}>
        <View style={styles.redBar} />
        <View style={styles.orangeBar} />
        <View style={styles.greenBar} />
      </View>
    </View>
    <View style={styles.headerDivider} />
  </View>
);

const Footer = ({ assetBase }) => (
  <View style={styles.footer} fixed>
    <View style={styles.footerDivider} />
    <View style={styles.footerRow}>
      <Image src={asset(assetBase, "1lrs.png")} style={styles.footerLrsLogo} />
      <Text
        style={styles.pageNumber}
        render={({ pageNumber }) => `Page ${pageNumber}`}
      />
      <Image
        src={asset(assetBase, "fasttop1.jpg")}
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
    if (!line) return;

    // Preserve the logical boundary represented by the old page-gap marker,
    // but do not force a physical page break or add visible empty space.
    // This prevents text on either side of the marker from being joined.
    if (line === "[[PAGE_GAP]]") {
      blocks.push({ type: "boundary", text: "" });
      return;
    }

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

const toFinalGuaranteeBlocks = (blocks) =>
  blocks.map((block) => ({
    ...block,
    text: block.text
      .replace(
        "The following guarantee specification",
        "The following guarantee\u00A0specification",
      )
      .replace(
        "Only Waterproofing products supplied by LRS",
        "Only products supplied by LRS",
      ),
  }));

const getMarkerKeys = (heading) =>
  [TOC_KEYS[heading], INTERNAL_PAGE_KEYS[heading]].filter(
    (value, index, array) => value && array.indexOf(value) === index,
  );

const SectionMarker = ({ markerKeys, registry }) => {
  const keys = (markerKeys || []).filter(Boolean);
  if (!keys.length) return null;

  return (
    <Text
      style={styles.sectionMarker}
      render={({ pageNumber }) => {
        keys.forEach((key) => {
          registry[key] = pageNumber;
        });
        return "";
      }}
    />
  );
};

const getReferenceTargetKey = (text) => {
  if (
    /Safety First|Safety Measures|Safety Precautions|Safe Working|Health and Safety Legislation/i.test(
      text,
    )
  ) {
    return "safety";
  }

  if (/Preparation of Existing Details/i.test(text)) return "preparation";
  if (/Applying FastCoat Waterproof Coating/i.test(text)) return "baseCoat";
  if (/Clean Surface:/i.test(text)) return "cleaning";
  if (/cleaning.*(?:Please see|See)/i.test(text)) return "cleaning";

  return null;
};

const resolveTextWithPageReference = (text, registry, pageStarts) => {
  const targetKey = getReferenceTargetKey(text);
  if (!targetKey) return text;

  const referenceRegex =
    /(Please see|See)\s+pages?\s+\d+(?:\s*[-–]\s*\d+)?(\.)?/i;
  const match = referenceRegex.exec(text);
  if (!match) return text;

  const page = registry[targetKey] ?? pageStarts?.[targetKey];
  // Two digits reserve approximately the same width during React PDF's first
  // layout pass. On the final render pass the actual page number is used.
  const pageText = page == null ? "00" : String(page);
  const prefix = match[1];
  const punctuation = match[2] || "";

  return (
    text.slice(0, match.index) +
    `${prefix} page ${pageText}${punctuation}` +
    text.slice(match.index + match[0].length)
  );
};

const renderBlock = (block, index, prefix, registry, pageStarts) => {
  if (block.type === "boundary") return null;

  const isMajor = block.type === "majorHeading";
  const isHeading = block.type === "heading" || block.type === "numbered";
  const markerKeys = getMarkerKeys(block.text);
  const targetKey = getReferenceTargetKey(block.text);
  const hasDynamicReference =
    Boolean(targetKey) &&
    /(Please see|See)\s+pages?\s+\d+(?:\s*[-–]\s*\d+)?/i.test(block.text);

  const minPresenceAhead = isMajor ? 32 : isHeading ? 18 : 0;

  const textProps = hasDynamicReference
    ? {
        render: () =>
          resolveTextWithPageReference(block.text, registry, pageStarts),
      }
    : {};

  return (
    <React.Fragment key={`${prefix}-${index}`}>
      <Text
        style={[
          isMajor ? styles.sectionTitle : styles.paragraph,
          isHeading && styles.subsectionTitle,
          block.type === "bullet" && styles.bullet,
          block.type === "nestedBullet" && styles.nestedBullet,
        ]}
        minPresenceAhead={minPresenceAhead}
        orphans={2}
        widows={2}
        {...textProps}
      >
        {hasDynamicReference ? null : block.text}
      </Text>
      {markerKeys.length > 0 ? (
        <SectionMarker markerKeys={markerKeys} registry={registry} />
      ) : null}
    </React.Fragment>
  );
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
    // Keep the Materials Only guarantee in the flowing body, matching the
    // original document structure.
    body: lines,
    // Re-use the same source wording for the separate signed guarantee page.
    guarantee:
      guaranteeIndex === -1 ? [] : lines.slice(guaranteeIndex + 1),
  };
};

const ContentsPageNumber = ({ targetKey, registry, pageStarts }) => (
  <Text
    style={styles.contentsPage}
    render={() => {
      const page = registry[targetKey] ?? pageStarts?.[targetKey];
      return page == null ? "" : String(page);
    }}
  />
);

const Contents = ({ registry, pageStarts, hasPhotos }) => {
  const rows = [
    ["Project details", "project"],
    ["Preliminaries & general conditions", "preliminaries"],
    [
      "Existing falls, change in scope of works, existing roof condition",
      "existingFalls",
    ],
    [
      "Natural growth, adhesion test, compliance with building regulations",
      "naturalGrowth",
    ],
    ["Flat roof detailing guidance & CDM", "flatRoof"],
    ["Roof specification", "roofSpecification"],
    ["The roof build-up and preparation", "roofBuildUp"],
    ["Cleaning, TV, satellite arrays, cables", "cleaning"],
    ["Waterproof coverings", "waterproof"],
    ["Additional information", "additional"],
    ["General guidance and requirements", "general"],
    ...(hasPhotos ? [["Photographs", "photographs"]] : []),
    ["Materials and guarantee", "materials"],
    ["Guarantee", "guarantee"],
  ];

  return (
    <>
      <View style={styles.contentsHeader}>
        <Text style={styles.contentsTitle}>Contents</Text>
        <Text style={styles.contentsHeaderText}>Page</Text>
      </View>
      {rows.map(([label, targetKey]) => (
        <View key={label} style={styles.contentsRow}>
          <Text style={styles.contentsLabel}>{label}</Text>
          <ContentsPageNumber
            targetKey={targetKey}
            registry={registry}
            pageStarts={pageStarts}
          />
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

const RoofRow = ({ label, value }) => (
  <View style={styles.roofRow} wrap={false}>
    <Text style={styles.roofLabel}>{label}</Text>
    <Text style={styles.roofValue}>{value || "TBC"}</Text>
  </View>
);

const RoofSpecificationSection = ({ reference, image, registry }) => (
  <>
    {/*
      Keep only the heading and its introductory line together.
      Do NOT reserve the height of the image here: that was the main cause
      of the large blank areas. The image is allowed to move by itself if it
      cannot fit in the remaining A4 content area.
    */}
    <View wrap={false}>
      <Text style={styles.sectionTitle}>
        Roof Specification
      </Text>
      <SectionMarker markerKeys={["roofSpecification"]} registry={registry} />
      <Text style={styles.paragraph}>
        Roof areas covered in this specification: {reference || "TBC"}
      </Text>
    </View>

    {image ? (
      <View style={styles.roofImageFrame} wrap={false}>
        <Image src={image} style={styles.roofImage} />
      </View>
    ) : null}
  </>
);

const RoofBuildUpSection = ({ roofDetailsProps, reference, registry }) => {
  const rows = getRoofRows(roofDetailsProps);
  const firstRows = rows.slice(0, 2);
  const remainingRows = rows.slice(2);

  return (
    <>
      {/*
        Keep only the heading, intro and first two rows together. This is
        enough to stop an orphan "The Roof Build Up" heading without forcing
        the whole table onto the next page and leaving a large blank area.
      */}
      <View wrap={false}>
        <Text style={styles.sectionTitle}>The Roof Build Up</Text>
        <SectionMarker markerKeys={["roofBuildUp"]} registry={registry} />

        <Text style={styles.paragraph}>
          With the information and images provided this specification is for {reference || "TBC"}.
        </Text>

        <View style={styles.roofTable}>
          {firstRows.map(([label, value]) => (
            <RoofRow key={label} label={label} value={value} />
          ))}
        </View>
      </View>

      {remainingRows.length > 0 ? (
        <View style={styles.roofTableContinuation}>
          {remainingRows.map(([label, value]) => (
            <RoofRow key={label} label={label} value={value} />
          ))}
        </View>
      ) : null}
    </>
  );
};

const MaterialsSection = ({ registry, compact = false }) => (
  <View
    style={[
      styles.materialsArea,
      compact && { marginTop: 0, marginBottom: 14 },
    ]}
    wrap={false}
  >
    <Text style={styles.materialsLabel}>Materials</Text>
    <SectionMarker markerKeys={["materials"]} registry={registry} />
    <Text style={styles.paragraph}>TBC</Text>
  </View>
);

const PhotographsAndMaterials = ({ photos, registry }) => (
  <>
    <View wrap={false} minPresenceAhead={80}>
      <Text style={styles.photosTitle}>Photographs</Text>
      <SectionMarker
        markerKeys={["photographs"]}
        registry={registry}
      />
    </View>

    {photos.length > 0 ? (
      <View style={styles.photosGrid}>
        {photos.map((photo, index) => (
          <View
            key={`photograph-${index}`}
            style={[
              styles.photoBox,
              photos.length === 1 && styles.singlePhotoBox,
              photos.length === 2 && styles.twoPhotoBox,
            ]}
            wrap={false}
          >
            <Image src={photo} style={styles.photo} />
          </View>
        ))}
      </View>
    ) : null}

    <MaterialsSection registry={registry} />
  </>
);

const GuaranteeAndSignoff = ({ guaranteeBlocks, assetBase, registry, pageStarts }) => (
  <View style={styles.guaranteeSection}>
    <View wrap={false} minPresenceAhead={72}>
      <Text style={styles.materialsLabel}>Guarantee:</Text>
      <SectionMarker markerKeys={["guarantee"]} registry={registry} />
    </View>

    {guaranteeBlocks.map((block, index) =>
      renderBlock(
        block,
        index,
        "guarantee",
        registry,
        pageStarts,
      ),
    )}

    {/* Keep the complete sign-off together while allowing the guarantee text
        above it to flow naturally across A4 continuation pages. */}
    <View wrap={false}>
      <Text style={styles.signoffTitle}>Kind Regards</Text>
      <View style={styles.signoff}>
        <View style={styles.signoffColumn}>
          <Image src={asset(assetBase, "firma.png")} style={styles.signature} />
          <Text style={styles.contactName}>Paul Jones</Text>
          <Text style={styles.contactText}>LRS Technical Manager</Text>
          <Text style={styles.contactText}>T: 01948 841 877</Text>
          <Text style={styles.contactText}>E: paul.jones@lrs-systems.co.uk</Text>
          <Text style={styles.contactText}>W: www.lrs-systems.co.uk</Text>
        </View>

        <View style={styles.signoffColumn}>
          <Image src={asset(assetBase, "firmat.png")} style={styles.signature} />
          <Text style={styles.contactName}>Tom Shone</Text>
          <Text style={styles.contactText}>Managing Director</Text>
          <Text style={styles.contactText}>T: 07415 116280</Text>
          <Text style={styles.contactText}>E: tomshone@lrs-systems.co.uk</Text>
          <Text style={styles.contactText}>W: www.lrs-systems.co.uk</Text>
        </View>
      </View>
    </View>
  </View>
);

const BackCover = ({ assetBase }) => (
  <Page
    size={A4_PAGE_SIZE}
    orientation="portrait"
    style={styles.backCoverPage}
    wrap={false}
  >
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
      <Image src={asset(assetBase, "1lrs.png")} style={styles.backCoverLogo} />
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
  // Optional fallback/override values. The document normally discovers page
  // numbers during layout, but these remain useful if the parent already has
  // known page starts from a previous render.
  pageStarts = {},
}) => {
  // Mutable for this one PDF render. SectionMarker fills it with the actual
  // page numbers during React PDF's layout pass.
  const pageRegistry = {};

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
  const finalGuaranteeBlocks = toFinalGuaranteeBlocks(guaranteeBlocks);
  const guaranteeYears = guarantee === "25-year" ? "25" : "20";
  const safePhotos = Array.isArray(photos)
    ? photos.filter(Boolean).slice(0, 4)
    : [];
  const hasPhotos = safePhotos.length > 0;

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

  return (
    <Document
      title={`FastCoat TopCoat - ${reference || "Installation Specification"}`}
      author="Liquid Roofing Systems Ltd"
    >
      {/* COVER — always A4 and intentionally has no footer */}
      <Page
        size={A4_PAGE_SIZE}
        orientation="portrait"
        style={styles.coverPage}
        wrap={false}
      >
        <Image src={asset(assetBase, "1F.png")} style={styles.coverTopImage} />
        <View style={styles.coverContent}>
          {/* Requested cover logo, directly above INSTALLATION SPECIFICATION */}
          <Image src={asset(assetBase, "fasttop1.jpg")} style={styles.coverLogo} />
          <Text style={styles.coverTitle}>INSTALLATION SPECIFICATION</Text>
          <Text style={styles.coverReference}>
            {(reference || "PROJECT REFERENCE").toUpperCase()}
          </Text>
        </View>
      </Page>

      {/* CONTENTS */}
      <Page
        size={A4_PAGE_SIZE}
        orientation="portrait"
        style={styles.page}
        wrap
      >
        <Header surface={surface} />
        <Contents
          registry={pageRegistry}
          pageStarts={pageStarts}
          hasPhotos={hasPhotos}
        />
        <Text style={[styles.paragraph, { marginTop: 12 }]}>
          FastCoat Pro {guaranteeYears} Specification Ref: {lrsReference || "LRS – TBC"}
        </Text>
        <Footer assetBase={assetBase} />
      </Page>

      {/* PROJECT DETAILS */}
      <Page
        size={A4_PAGE_SIZE}
        orientation="portrait"
        style={styles.page}
        wrap
      >
        <Header surface={surface} />
        <Text style={styles.specificationTitle}>
          FastCoat Pro {guaranteeYears} Specification Ref: {lrsReference || "LRS – TBC"}
        </Text>
        <SectionMarker markerKeys={["project"]} registry={pageRegistry} />

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
        <Footer assetBase={assetBase} />
      </Page>

      {/*
        FLOWING TECHNICAL CONTENT
        One A4 Page component with wrap enabled is allowed to create as many
        A4 continuation pages as React PDF needs. This removes the old manual
        height estimation that was creating large unused gaps.
      */}
      <Page
        size={A4_PAGE_SIZE}
        orientation="portrait"
        style={styles.page}
        wrap
      >
        <Header surface={surface} />

        <Text style={styles.sectionTitle} minPresenceAhead={32}>
          Preliminaries and General Conditions
        </Text>
        <SectionMarker markerKeys={["preliminaries"]} registry={pageRegistry} />

        {contentBlocks.map((block, index) =>
          renderBlock(
            block,
            index,
            "common",
            pageRegistry,
            pageStarts,
          ),
        )}

        <RoofSpecificationSection
          reference={reference}
          image={image}
          registry={pageRegistry}
        />

        <RoofBuildUpSection
          roofDetailsProps={roofDetailsProps}
          reference={reference}
          registry={pageRegistry}
        />

        {afterRoofBlocks.map((block, index) =>
          renderBlock(
            block,
            index,
            "after-roof",
            pageRegistry,
            pageStarts,
          ),
        )}

        <Footer assetBase={assetBase} />
      </Page>

      {/* Do not create an almost-empty photographs page when no photographs
          were supplied. Materials then starts the guarantee page below. */}
      {hasPhotos ? (
        <Page
          size={A4_PAGE_SIZE}
          orientation="portrait"
          style={styles.page}
          wrap
        >
          <Header surface={surface} />
          <PhotographsAndMaterials
            photos={safePhotos}
            registry={pageRegistry}
          />
          <Footer assetBase={assetBase} />
        </Page>
      ) : null}

      {/* GUARANTEE + SIGNATURES — starts on a dedicated A4 page and can create
          A4 continuation pages if the selected guarantee wording needs them. */}
      <Page
        size={A4_PAGE_SIZE}
        orientation="portrait"
        style={styles.page}
        wrap
      >
        <Header surface={surface} />
        {!hasPhotos ? (
          <MaterialsSection registry={pageRegistry} compact />
        ) : null}
        <GuaranteeAndSignoff
          guaranteeBlocks={finalGuaranteeBlocks}
          assetBase={assetBase}
          registry={pageRegistry}
          pageStarts={pageStarts}
        />
        <Footer assetBase={assetBase} />
      </Page>

      {/* BACK COVER — always A4 and intentionally has no footer */}
      <BackCover assetBase={assetBase} />
    </Document>
  );
};

export default PdfDocumentFastCoatTop;