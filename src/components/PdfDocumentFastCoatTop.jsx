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
    paddingTop: 62,
    paddingRight: 54,
    paddingBottom: 58,
    paddingLeft: 54,
    color: "#111111",
    fontFamily: "Times-Roman",
    fontSize: 9.4,
  },
  cover: {
    padding: 0,
    position: "relative",
  },
  coverImage: {
    width: 595.2,
    height: 841.89,
    objectFit: "fill",
  },
  header: {
    position: "absolute",
    top: 27,
    left: 54,
    right: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
  },
  colourBars: {
    flexDirection: "row",
  },
  redBar: { width: 56, height: 4, backgroundColor: "#ef4136", marginLeft: 5 },
  orangeBar: { width: 56, height: 4, backgroundColor: "#f7931e", marginLeft: 5 },
  greenBar: { width: 56, height: 4, backgroundColor: "#39b54a", marginLeft: 5 },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 54,
    right: 54,
    alignItems: "center",
    fontFamily: "Helvetica",
    fontSize: 9,
  },
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 11,
  },
  subsection: {
    fontFamily: "Times-Bold",
    fontSize: 9.8,
    marginTop: 5,
    marginBottom: 2,
  },
  line: {
    fontSize: 9.3,
    lineHeight: 1.12,
    marginBottom: 0.25,
  },
  bullet: {
    marginLeft: 14,
  },
  nestedBullet: {
    marginLeft: 28,
  },
  pageGap: {
    height: 2,
  },
  contentsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  contentsTitle: {
    fontFamily: "Times-Bold",
    fontSize: 14,
    marginBottom: 17,
  },
  contentsLabel: {
    width: "87%",
    fontSize: 9.5,
  },
  contentsPage: {
    width: "13%",
    textAlign: "right",
    fontSize: 9.5,
  },
  specTitle: {
    fontFamily: "Times-Bold",
    fontSize: 13,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 7,
  },
  detailLabel: {
    width: "37%",
    fontFamily: "Times-Bold",
  },
  detailValue: {
    width: "63%",
  },
  roofIntro: {
    marginBottom: 10,
    lineHeight: 1.25,
  },
  roofTable: {
    borderTopWidth: 0.6,
    borderTopColor: "#777777",
    marginBottom: 9,
  },
  roofRow: {
    flexDirection: "row",
    borderBottomWidth: 0.35,
    borderBottomColor: "#cccccc",
    paddingVertical: 3,
  },
  roofLabel: {
    width: "36%",
    fontFamily: "Times-Bold",
  },
  roofValue: {
    width: "64%",
  },
  specificationImage: {
    width: "100%",
    height: 220,
    objectFit: "contain",
    marginTop: 5,
    marginBottom: 10,
  },
  photosGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  photoBox: {
    width: "48%",
    height: 235,
    borderWidth: 0.5,
    borderColor: "#aaaaaa",
    padding: 4,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  signoff: {
    flexDirection: "row",
    marginTop: 16,
  },
  signoffColumn: {
    width: "50%",
    paddingRight: 15,
  },
  signature: {
    width: 135,
    height: 44,
    objectFit: "contain",
    marginBottom: 4,
  },
  closingImage: {
    position: "absolute",
    left: 54,
    bottom: 50,
    width: 487.2,
    height: 300,
    objectFit: "cover",
  },
  bold: {
    fontFamily: "Times-Bold",
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
  "Roof Specification",
  "The Roof Build Up",
  "Preparation",
  "Cleaning",
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

const Header = ({ surface, fixed = true }) => (
  <View style={styles.header} fixed={fixed}>
    <Text style={styles.headerTitle}>FastCoat onto {surface}</Text>
    <View style={styles.colourBars}>
      <View style={styles.redBar} />
      <View style={styles.orangeBar} />
      <View style={styles.greenBar} />
    </View>
  </View>
);

const Footer = ({ fixed = true, number }) => (
  <View style={styles.footer} fixed={fixed}>
    {number ? (
      <Text>{number}</Text>
    ) : (
      <Text render={({ pageNumber }) => String(pageNumber)} />
    )}
  </View>
);

const isSubheading = (line) =>
  SECTION_HEADINGS.has(line) ||
  /^\d+\.\s+/.test(line) ||
  (/^[^•o].{0,72}:$/.test(line) && !line.startsWith("http"));

const renderLine = (line, index, prefix) => {
  if (line === "[[PAGE_GAP]]") {
    return <View key={prefix + "-gap-" + index} style={styles.pageGap} />;
  }

  const heading = SECTION_HEADINGS.has(line);
  const subheading = !heading && isSubheading(line);
  const bullet = line.startsWith("•");
  const nestedBullet = /^o\s/.test(line);

  return (
    <Text
      key={prefix + "-line-" + index}
      style={[
        styles.line,
        heading && styles.subsection,
        subheading && styles.bold,
        bullet && styles.bullet,
        nestedBullet && styles.nestedBullet,
      ]}
      minPresenceAhead={heading || subheading ? 24 : 0}
    >
      {line}
    </Text>
  );
};

const withConditionalContent = ({ guarantee, isFullyPrimed, trafficCoat }) => {
  const afterRoof =
    guarantee === "25-year"
      ? TWENTY_FIVE_YEAR_AFTER_ROOF
      : TWENTY_YEAR_AFTER_ROOF;
  const primer =
    guarantee === "25-year" ? TWENTY_FIVE_YEAR_PRIMER : TWENTY_YEAR_PRIMER;
  const result = [];
  let insideTraffic = false;

  afterRoof.forEach((line) => {
    if (line === "[[TRAFFIC_START]]") {
      insideTraffic = true;
      return;
    }
    if (line === "[[TRAFFIC_END]]") {
      insideTraffic = false;
      return;
    }
    if (insideTraffic && trafficCoat !== "Yes") return;

    result.push(line);
    if (line === "Waterproofing Coverings" && isFullyPrimed) {
      result.push(...primer);
    }
  });

  return result;
};

const DEFAULT_PAGE_STARTS = {
  project: 3,
  preliminaries: 4,
  existingFalls: 4,
  naturalGrowth: 4,
  flatRoof: 5,
  roofSpecification: 6,
  roofBuildUp: 6,
  cleaning: 7,
  waterproof: 7,
};

const getPageStarts = ({
  guarantee,
  isFullyPrimed,
  trafficCoat,
  photoCount,
}) => {
  let ending;
  if (guarantee === "25-year") {
    ending = isFullyPrimed
      ? { general: 13, materials: 14 }
      : { general: 12, materials: 13 };
  } else if (isFullyPrimed) {
    ending = {
      general: trafficCoat === "Yes" ? 12 : 11,
      materials: 13,
    };
  } else {
    ending = { general: 11, materials: 12 };
  }

  const photoPages = photoCount > 0 ? 1 : 0;
  return {
    ...DEFAULT_PAGE_STARTS,
    ...ending,
    additional: ending.general,
    photographs: ending.materials,
    materials: ending.materials + photoPages,
    guarantee: ending.materials + photoPages,
  };
};

const Contents = ({ pageStarts = DEFAULT_PAGE_STARTS, showPhotographs }) => {
  const rows = [
    ["Project details", pageStarts.project],
    ["Preliminaries & general conditions", pageStarts.preliminaries],
    ["Existing falls, change in scope of works, existing roof condition", pageStarts.existingFalls],
    ["Natural growth, adhesion test, compliance with building regulations", pageStarts.naturalGrowth],
    ["Flat roof detailing guidance & CDM", pageStarts.flatRoof],
    ["Roof specification", pageStarts.roofSpecification],
    ["The roof build-up and preparation", pageStarts.roofBuildUp],
    ["Cleaning, TV, satellite arrays, cables", pageStarts.cleaning],
    ["Waterproof coverings", pageStarts.waterproof],
    ["Additional information", pageStarts.additional],
    ["General guidance and requirements", pageStarts.general],
    ...(showPhotographs ? [["Photographs", pageStarts.photographs]] : []),
    ["Materials and guarantee", pageStarts.materials],
    ["Guarantee", pageStarts.guarantee],
  ];

  return (
    <>
      <Text style={styles.contentsTitle}>Contents</Text>
      {rows.map(([label, page]) => (
        <View key={label} style={styles.contentsRow}>
          <Text style={styles.contentsLabel}>{label}</Text>
          <Text style={styles.contentsPage}>{page}</Text>
        </View>
      ))}
    </>
  );
};

const RoofDetails = ({
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
}) => {
  const rows = [
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

const PdfDocumentFasCoatTop = ({
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
  const afterRoof = withConditionalContent({
    guarantee,
    isFullyPrimed,
    trafficCoat: selectedTrafficCoat,
  });
  const guaranteeYears = guarantee === "25-year" ? "25" : "20";
  const safePhotos = Array.isArray(photos) ? photos.filter(Boolean).slice(0, 4) : [];
  const photoRows = [];
  for (let index = 0; index < safePhotos.length; index += 2) {
    photoRows.push(safePhotos.slice(index, index + 2));
  }
  const resolvedPageStarts =
    pageStarts ||
    getPageStarts({
      guarantee,
      isFullyPrimed,
      trafficCoat: selectedTrafficCoat,
      photoCount: safePhotos.length,
    });

  return (
    <Document
      title={"FastCoat TopCoat - " + (reference || "Installation Specification")}
      author="Liquid Roofing Systems Ltd"
    >
      <Page size="A4" style={styles.cover} wrap={false}>
        <Image
          src={asset(assetBase, "fastcoat-top-cover.jpg")}
          style={styles.coverImage}
        />
        <Header surface={surface} fixed={false} />
        <Footer number="1" fixed={false} />
      </Page>

      <Page size="A4" style={styles.page}>
        <Header surface={surface} />
        <Contents
          pageStarts={resolvedPageStarts}
          showPhotographs={safePhotos.length > 0}
        />
        <Text style={[styles.line, { marginTop: 10 }]}>
          FastCoat Pro {guaranteeYears} Specification Ref: {lrsReference || "LRS – TBC"}
        </Text>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Header surface={surface} />
        <Text style={styles.specTitle}>
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
        <Footer />
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <Header surface={surface} />
        <Text style={styles.sectionTitle}>Preliminaries and General Conditions</Text>
        {COMMON_BEFORE_ROOF.map((line, index) =>
          renderLine(line, index, "common"),
        )}

        <Text style={styles.sectionTitle}>Roof Specification</Text>
        <Text style={styles.roofIntro}>
          Roof areas covered in this specification: {reference || "TBC"}
        </Text>
        {image ? <Image src={image} style={styles.specificationImage} /> : null}

        <Text style={styles.sectionTitle}>The Roof Build Up</Text>
        <Text style={styles.roofIntro}>
          With the information and images provided this specification is for {reference || "TBC"}.
        </Text>
        <RoofDetails
          reference={reference}
          roofSize={roofSize}
          roofType={roofType}
          roofBuildUp={roofBuildUp}
          uValue={uValue}
          outlets={outlets}
          skylights={skylights}
          acUnits={acUnits}
          existingCoatings={existingCoatings}
          pondingWater={pondingWater}
        />

        {afterRoof.map((line, index) => renderLine(line, index, "after"))}

        {safePhotos.length > 0 ? (
          <>
          <Text style={styles.sectionTitle}>Photographs</Text>
            {photoRows.map((row, rowIndex) => (
              <View key={"photo-row-" + rowIndex} style={styles.photosGrid} wrap={false}>
                {row.map((src, photoIndex) => (
                  <View key={"photo-" + rowIndex + "-" + photoIndex} style={styles.photoBox}>
                    <Image src={src} style={styles.photo} />
                  </View>
                ))}
              </View>
            ))}
          </>
        ) : null}

        <View wrap={false}>
          <Text style={styles.sectionTitle}>Materials</Text>
          <Text style={[styles.line, { marginBottom: 15 }]}>TBC</Text>
          <Text style={styles.sectionTitle}>Guarantee:</Text>
          <Text style={[styles.line, { marginBottom: 8 }]}>
            Materials only. The following guarantee-specification is covered by LRS product guarantee for the period of {guaranteeYears}-years from the date of practical completion.
          </Text>
          <Text style={[styles.line, { marginBottom: 14 }]}>
            Please Note: Only products supplied by LRS will be covered in this guarantee.
          </Text>
          <Text style={[styles.line, styles.bold]}>Kind Regards</Text>
          <View style={styles.signoff}>
            <View style={styles.signoffColumn}>
              <Image src={asset(assetBase, "firma.png")} style={styles.signature} />
              <Text style={[styles.line, styles.bold]}>Paul Jones</Text>
              <Text style={styles.line}>LRS Technical Manager</Text>
              <Text style={styles.line}>T: 01948 841 877</Text>
              <Text style={styles.line}>E: paul.jones@lrs-systems.co.uk</Text>
              <Text style={styles.line}>W: www.lrs-systems.co.uk</Text>
            </View>
            <View style={styles.signoffColumn}>
              <Image src={asset(assetBase, "firmat.png")} style={styles.signature} />
              <Text style={[styles.line, styles.bold]}>Tom Shone</Text>
              <Text style={styles.line}>Managing Director</Text>
              <Text style={styles.line}>T: 07415 116280</Text>
              <Text style={styles.line}>E: tomshone@lrs-systems.co.uk</Text>
              <Text style={styles.line}>W: www.lrs-systems.co.uk</Text>
            </View>
          </View>
        </View>
        <Image
          src={asset(assetBase, "2F.png")}
          style={[
            styles.closingImage,
            guarantee === "20-year" &&
              !isFullyPrimed &&
              { height: selectedTrafficCoat === "Yes" ? 180 : 220 },
            guarantee === "20-year" &&
              isFullyPrimed &&
              selectedTrafficCoat === "Yes" &&
              { height: 250 },
            guarantee === "25-year" &&
              isFullyPrimed &&
              selectedTrafficCoat === "Yes" &&
              { height: 220 },
            guarantee === "25-year" &&
              !isFullyPrimed &&
              { height: selectedTrafficCoat === "Yes" ? 60 : 170 },
            safePhotos.length > 0 && { height: 60 },
          ]}
        />
        <Footer />
      </Page>
    </Document>
  );
};

export default PdfDocumentFasCoatTop;