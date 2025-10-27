  import React from 'react';
  import {
    Document,
    Page,
    View,
    Text,
    Image,
    StyleSheet,
    Font
  } from '@react-pdf/renderer';
  import { Svg, Polygon } from '@react-pdf/renderer';
  
  
  
  // Estilos PDF
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 12,
      fontFamily: 'Helvetica',
      color: '#000',
      lineHeight: 1.6,
    },
    header: {
      fontSize: 16,
      color: '#4c4c4c',
      marginBottom: 8,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#231f20',
      letterSpacing: 1,
      textAlign: 'center',
    },
    line: {
      width: 40,
      height: 3,
      marginHorizontal: 2,
      backgroundColor: '#231f20',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    label: {
      fontWeight: 'bold',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#231f20',
      marginBottom: 15,
    },
    textBold: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 6,
    },
    text: {
      fontSize: 12,
      marginBottom: 4,
    },
    listItem: {
      marginLeft: 16,
      fontSize: 12,
      marginBottom: 4,
    },
    footer: {
      position: 'absolute',
      bottom: 40,
      left: 60,
      right: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 10,
      color: '#666',
    },
  });
  
  
    
  const getGuaranteeText = (guarantee) => { 
    return guarantee === '25-year'
     ? 'FastCoat Pro 25 Specification' 
     : 'FastCoat Pro 20 Specification'; 
    };
  
    const surfaceTexts = {
      Asbestos: "Ensure surface is cleaned and all loose material removed. Use primer for adhesion.",
      Concrete: "Concrete must be fully cured and primed for proper bonding of the system.",
      "Existing Coatings": "Inspect coating integrity and clean surface thoroughly before application.",
      "Single-Ply": "Use primer designed for flexible membrane adhesion on single-ply surfaces.",
      VCL: "Vapour Control Layers must be sealed and intact before proceeding.",
      Asphalt: "Asphalt must be stable and primed with bitumen-compatible primer.",
      Felt: "Felt should be clean, dry and firmly bonded. Apply appropriate primer.",
      GRP: "GRP surface must be abraded and cleaned before applying primer.",
      Metal: "Remove rust, degrease, and apply metal primer.",
      Timber: "Timber must be dry and structurally sound. Prime before coating."
    };
    
    
    const PdfDocumentFastCoat = ({
      reference,
      date,
      roofSize,
      attention,
      preparedBy,
      guarantee,
      surface,
      image,
      lrsReference,
      roofType,
    uValue,
    outlets,
    skylights,
    acUnits,
    existingCoatings,
    pondingWater,
    antiSkid,
    photos,
    roofBuildUp,
    }) => {
      const guaranteeText = getGuaranteeText(guarantee);
      const surfaceText = surfaceTexts[surface] || '';
  
      const fullyPrimedSurfaces = [
          'Fibre Cement', 'Concrete', 'Existing Coatings', 'Single-Ply', 'GRP', 'Metal',
        ];
        
        const isFullyPrimed = fullyPrimedSurfaces.includes(surface);
  
  
        const user = JSON.parse(localStorage.getItem("user"));
  
        const preparedByName = user?.name || "Paul Jones";
  const preparedByRole = user?.role || "Technical Manager";
  const preparedByPhone = user?.phone || "T: 01948 841 877";
  const preparedByEmail = user?.email || "E: paul.jones@lrs-systems.co.uk";
  
  
  const PdfHeader = ({ reference }) => (
    <>
      <View
        style={{
          marginHorizontal: -40,
          marginTop: -40,
          paddingHorizontal: 40,
          paddingTop: 30,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Título del proyecto */}
        <Text
          style={{
            fontSize: 20,
            color: '#666666',
            fontWeight: 'normal',
            lineHeight: 1.4,
          }}
        >
          {reference || 'Project Name Here'}
        </Text>
  
        {/* 3 líneas horizontales */}
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <View
            style={{
              height: 4,
              width: 40,
              backgroundColor: '#ef4136',
            }}
          />
          <View
            style={{
              height: 4,
              width: 40,
              backgroundColor: '#f7931e',
            }}
          />
          <View
            style={{
              height: 4,
              width: 40,
              backgroundColor: '#39b54a',
            }}
          />
        </View>
      </View>
  
      {/* Línea separadora inferior */}
      <View
        style={{
          height: 1,
          backgroundColor: '#000',
          marginBottom: 20,
          width: '100%',
        }}
      />
    </>
  );
  
      
      const PdfFooter = ({ guarantee, pageNumber }) => (
        <>
      
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 40,
              right: 40,
              paddingVertical: 10,
              alignItems: 'center',
            }}
          >
            {/* Logos en una fila */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Image
                src="https://i.postimg.cc/rwMLwvcz/lrs-1.png"
                style={{ width: 110 }}
              />
              <Image
                src={
                  guarantee === '25-year'
                    ? 'https://i.postimg.cc/NjhXVsGZ/LRS-FASTCOAT-PRO-without-registered-trademark-Amended-26th-June-2025-01.jpg'
                    : 'https://i.postimg.cc/NjhXVsGZ/LRS-FASTCOAT-PRO-without-registered-trademark-Amended-26th-June-2025-01.jpg'
                }
                style={{ width: 200 }}
              />
            </View>
      
            {/* Número de página centrado debajo */}
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 6 }}>
              Page {pageNumber}
            </Text>
          </View>
        </>
      );
      
      
      const getWaterproofPagesCount = ({ guarantee, surface }) => {
        const isFullyPrimed = fullyPrimedSurfaces.includes(surface);
        let count = 13;
      
        // Solo incluye primer si la superficie es fully primed
        const includesPrimer = isFullyPrimed;
      
        if (!includesPrimer) count -= 2;
      
        return count;
      };
      
      
      const waterproofPageCount = getWaterproofPagesCount({ guarantee, surface, antiSkid });
      
      const baseSections = [
        { title: 'Project details', pages: 1 },
        { title: 'Preliminaries & general conditions', pages: 1 },
        { title: 'Existing falls, change in scope of works, roof condition', pages: 1 },
        { title: 'Natural growth', pages: 1 },
        { title: 'Flat roof detailing guidance & CDM', pages: 3 },
        { title: 'Roof specification', pages: 1 },
        { title: 'The roof build-up and preparation', pages: 2 },
        { title: 'Cleaning, TV, satellite arrays, cables', pages: 2 },
        { title: 'Waterproof coverings', pages: waterproofPageCount },
        { title: 'General guidance and requirements', pages: 3 },
        { title: 'Photographs', pages: 1 },
        { title: 'Materials & Guarantee', pages: 1 },
      ];
      
      const generatePageIndex = ({ guarantee, surface, antiSkid }) => {
        const pages = [];
        let currentPage = 3;
      
        for (const section of baseSections) {
          pages.push({ title: section.title, page: currentPage });
          currentPage += section.pages;
    
        }
      
        return pages;
      };
      
      const pageIndex = generatePageIndex({ guarantee, surface, antiSkid });
      
      const getPageNumber = (title) =>
        pageIndex.find((p) => p.title === title)?.page || '—';
      
      
  let waterproofPageIndex = 0;
  
    return (
      <Document>
  
             {/* Página 1: Portada */}
  
  
             <Page size="A4" style={{ padding: 0, margin: 0 }}>
    {/* Imagen superior (sin padding) */}
    <Image src="/1F.png" style={{ width: '100%' }} />
  
    {/* Contenido central más protagonista */}
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      textAlign: 'center'
    }}>
      {/* Logo: MUCHO más grande */}
      <Image
        src={guarantee === '25-year'    ? 'https://i.postimg.cc/NjhXVsGZ/LRS-FASTCOAT-PRO-without-registered-trademark-Amended-26th-June-2025-01.jpg'
                    : 'https://i.postimg.cc/NjhXVsGZ/LRS-FASTCOAT-PRO-without-registered-trademark-Amended-26th-June-2025-01.jpg'}
        style={{ width: 340, marginBottom: 40 }}
      />
  
      {/* Título: más peso y tamaño */}
      <Text style={{
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 18
      }}>
        INSTALLATION SPECIFICATION
      </Text>
  
      {/* Project Reference: más grande y azul plomo */}
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666666'
      }}>
        {reference?.toUpperCase() || 'PROJECT REFERENCE'}
      </Text>
    </View>
  </Page>
  
         {/* Página 2: Content */}
         <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />
  
    <Text style={styles.sectionTitle}>Contents</Text>
  
    {pageIndex.map(({ title, page }, idx) => (
      <View key={idx} style={styles.tableRow}>
        <Text>{title}</Text>
        <Text>{page}</Text>
      </View>
    ))}
  
    <PdfFooter guarantee={guarantee} pageNumber={2} />
  </Page>
  
  
  
        {/* Página 3: Detalles del Proyecto */}
        <Page size="A4" style={styles.page}>
        <PdfHeader reference={reference} />
  
    {/* Título principal */}
  <Text style={[styles.sectionTitle, { fontSize: 18, marginBottom: 30 }]}>
    {guarantee === '25-year'
      ? 'FastCoat Pro 25 Specification'
      : 'FastCoat Pro 20 Specification'} Ref: {lrsReference || 'LRS – [ref]'}
  </Text>
  
  {/* Tabla de información */}
  <View style={{ flexDirection: 'row', gap: 40 }}>
    {/* Columna izquierda: etiquetas */}
    <View style={{ gap: 14 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>Date</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>Project reference</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>Roof size</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>For the attention of</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>Prepared by</Text>
    </View>
  
    {/* Columna derecha: datos */}
    <View style={{ gap: 14 }}>
      <Text style={{ fontSize: 13.5, color: '#000' }}>{date || '_______'}</Text>
      <Text style={{ fontSize: 13.5, color: '#000' }}>{reference || '_______'}</Text>
      <Text style={{ fontSize: 13.5, color: '#000' }}>{roofSize || '_______'}</Text>
      <Text style={{ fontSize: 13.5, color: '#000' }}>{attention || '_______'}</Text>
      <View>
    <Text style={{ fontSize: 13.5, color: '#000' }}>{preparedByName}</Text>
    <Text style={{ fontSize: 13.5, color: '#000' }}>{preparedByRole}</Text>
    <Text style={{ fontSize: 13.5, color: '#000' }}>{preparedByPhone}</Text>
    <Text style={{ fontSize: 13.5, color: '#0072ce' }}>{preparedByEmail}</Text>
  </View>
  
    </View>
  </View>
  
   {/* Project details */}
  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Project details')} />
  </Page>
  
  
   
 
 {/* =========================
    Página 4 – Preliminaries and General Conditions
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Preliminaries and General Conditions</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      Before tendering the contractor should visit site and ascertain all local conditions
      and restrictions, accessibility, the full extent and nature of the work, the supply
      and conditions affecting labour and the execution of the contract generally, no
      claims arising from the failure to do so will be considered.
    </Text>

    {/* (Opcional) Nota extra para 25-year si quieres mantenerla como en tu versión previa */}
    {guarantee === '25-year' && (
      <Text style={[styles.text, { marginBottom: 12 }]}>
        All LRS PRO system specifications need to be undertaken by ‘LRS Approved’ operatives.
      </Text>
    )}

    <Text style={[styles.text, { marginBottom: 12 }]}>
      All roofing materials are to be supplied by Liquid Roofing Systems Ltd (LRS) and to be fit for purpose
      and of the type and quality herein. Any sub-standard materials will be rejected. No alternatives are to be substituted.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      The contractor shall employ none but LRS Approved, competent tradesman and
      the whole of the works shall be carried out and completed in accordance with the
      correct <Text style={styles.label}>FastCoat Pro Specification</Text>.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      <Text style={styles.label}>Waterproofing Only</Text>{' '}
      This specification is based on a waterproofing only overlay and of an existing roof
      covering and does not include thermal insulation.
    </Text>

    <Text style={[styles.text, { marginBottom: 8 }]}>
      <Text style={styles.label}>Measuring the Roof</Text>{' '}
      It is important to accurately measure your roof to determine the amounts of
      materials required. (Including a realistic amount for wastage – guide minimum
      10% of the gross surface area).
    </Text>

    <Text style={[styles.text, { marginBottom: 16 }]}>
      The roof area should include all areas to be coated including upstands and
      perimeter details etc.
    </Text>

    <Text style={styles.sectionTitle}>Existing Falls</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      FastCoat will follow the contours of the existing surface. Falls and any deviations
      will be replicated. As a result, some areas of standing water may occur. Please
      note the accumulation of ice, frost or ponding water will not have an adverse
      effect on the FastCoat membrane. However good roofing practise suggests areas
      of ponding water should be eliminated.
    </Text>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Preliminaries & general conditions')}
  />
</Page>

{/* =========================
    Página 5 – Existing Falls
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      This applies to the life expectancy and / or the long-term performance of the
      system and will not affect the product guarantee in any way.
    </Text>

    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Change in Scope of Works</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      LRS must be informed immediately of any proposed requirements to change,
      and the approved installer must not implement any changes until agreed by LRS.
      LRS will not be responsible for any changes of which they are not aware of or
      have not authorised, nor will they accept any liability or associated cost due to
      system failure.
    </Text>

    <Text style={styles.sectionTitle}>Existing Roof Condition</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      The existing roof build-up should be inspected for defects and made good where
      required.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      Taking core samples of several random areas to obtain information of the sub-
      structure below the roof surface is highly recommended. This is the responsibility
      of the roofing contractor and could help prevent any unforeseen issues arising
      during or after application.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      Any areas where the insulation or the underlying substrate has collapsed, is
      defective or decayed, should be cut out, repaired, and reinstated on a like-for-like
      basis to provide a good solid base for the new coating system.
    </Text>

    <Text style={[styles.text, { marginBottom: 16 }]}>
      No claims can be considered by Liquid Roofing Systems Ltd should there be any
      latent defects resulting from faulty decking or substrate.
    </Text>

    <Text style={styles.sectionTitle}>Natural Growth / Vegetation</Text>

    <View style={{ marginLeft: 16, marginBottom: 16 }}>
  <Text style={styles.text}>• Remove all existing vegetation by mechanical extraction.</Text>
  <Text style={styles.text}>
    • LRS 799 Wash-N-Prep may be used to remove stubborn staining / growth. Consult
    separate data sheet for more further information.
  </Text>
  <Text style={styles.text}>
    • Wash off any 799 Wash-N-Prep residues before applying any LRS waterproof coatings.
  </Text>
  <Text style={styles.text}>
    • 1no. 799 Wash-N-Prep 1ltr bottle will clean approx. 148m² at a ratio of 16:1 with clean water.
  </Text>
  <Text style={styles.text}>
        • 799 Wash N Prep can be added to either a pump sprayer or as an attachment on a power
      </Text>
  </View>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Existing falls, change in scope of works, roof condition')}
  />
</Page>

{/* =========================
    Página 6 – Natural Growth/Vegetation
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>

<View style={{ marginLeft: 16, marginBottom: 16 }}>
<Text style={styles.text}>
        washer.
      </Text>
      <Text style={styles.text}>
        • For general cleaning add 250ml of 799 Wash N Prep to 4ltrs of clean water.
      </Text>
      <Text style={styles.text}>
        • For heavy duty cleaning add 500ml of 799 Wash N Prep to 4ltrs of clean water.
      </Text>
      <Text style={styles.text}>
        • Once applied the 799 Wash N Prep should be left for a minimum of 15 minutes to allow the stubborn stains to loosen.
      </Text>
      <Text style={styles.text}>
        • The roof should be power washed using clean water to remove any loosened material and residue.
      </Text>
    </View>

    <Text style={styles.sectionTitle}>Adhesion Test</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      <Text style={styles.label}>Test Areas:</Text>{' '}
      Clean and remove all dust and contamination before performing test patches.
      The surface should be primed using the relevant primer and allowed to dry.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      The contractor must document and record the identified test areas after applying the FastCoat Waterproof.
      The FastCoat Waterproof must be allowed to fully cure for 7 Days prior to the adhesion test being undertaken.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      This is to ensure all cleaning and preparation works have been carried out and completed to allow successful
      bonding of the liquid system in compliance with manufacturers specifications.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      Should the adhesion test fail the contractor must inform LRS immediately upon their findings so that alternative
      measures can be agreed before the main works commence.
    </Text>

    <Text style={styles.sectionTitle}>Compliance with Building Regulations</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      You should ensure that the design of the roof to which the FastCoat Pro is to be applied is in accordance with
      current regulations, codes and good practice.
    </Text>

    <Text style={[styles.text, { marginBottom: 8 }]}>
      For further guidance consult with:
    </Text>

    <View style={{ marginLeft: 16, marginBottom: 16 }}>
      <Text style={styles.text}>• BS6229 (Code of Practice for flat roofs with continuously supported coverings).</Text>
      <Text style={styles.text}>• BS5250 (Control of Condensation in Buildings).</Text>
      <Text style={styles.text}>
        • Local Authority Building Control regarding compliance with regulations or seek professional advice.
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Natural growth')}
  />
</Page>


{/* =========================
    Página 7 – Flat Roof Detailing Guidance
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Flat Roof Detailing Guidance</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      Any redundant roof details should be removed prior to the commencement of works.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      The roof area underneath should be made good as required, ensuring that it matches the build-up of the surrounding roof area.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      Termination details should have a minimum 150mm upstand height above the finished surface of the roof and should be terminated into a chase or have a suitable cover flashing or weathering flange. Any details that are unable to meet the 150mm should be terminated using a termination bar or LRS PU mastic.
    </Text>

    <Text style={[styles.text, { marginBottom: 16 }]}>
      Any details where this cannot be achieved should be periodically inspected and may require occasional maintenance.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      All detailing surfaces to be coated should be fully prepared and primed as per the main specification. The detailing should be dressed as far as possible into all outlets (minimum 150mm).
    </Text>

    <Text style={[styles.text, { marginBottom: 8 }]}>
      Care should be taken to ensure all roof details comply with:
    </Text>
    <View style={{ marginLeft: 16, marginBottom: 16 }}>
      <Text style={styles.text}>• BS 6229 Guidance (Flat Roofs with Continuously Supported Membranes)</Text>
      <Text style={styles.text}>• Guide 7.1 (Flat Roofs and Balconies) of the NHBC Standards 2020</Text>
      <Text style={styles.text}>• Liquid Roofing and Waterproofing Association Design Guide for Liquid Applied Waterproofing Systems for Roofs and Balconies, Issue 1, 2020</Text>
    </View>

    <Text style={styles.sectionTitle}>CDM</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      CDM Regulations are applicable to all construction projects – commercial or domestic.
    </Text>

    <Text style={[styles.text, { marginBottom: 8 }]}>
      <Text style={styles.label}>The Contractor’s responsibilities include:</Text>
    </Text>
    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>
        • Ensuring that all employed/appointed workers have the skills, knowledge, training, and experience to carry out the works, or are in the process of obtaining them.
      </Text>
      <Text style={styles.text}>
        • Providing appropriate supervision, information, and instructions to workers under their control.
      </Text>
    </View>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Flat roof detailing guidance & CDM')}
  />
</Page>

{/* =========================
    Página 8 – Safety Precautions
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* Contexto previo de la página anterior */}
  <Text style={[styles.text, { marginBottom: 8 }]}>
    Operatives should take an active part in helping to manage health and safety risks. Responsibilities include:
  </Text>
  <View style={{ marginLeft: 16, marginBottom: 16 }}>
    <Text style={styles.text}>
      • Only carrying out construction work if they have the relevant skills, knowledge, training, and experience. Alternatively, operatives need to ensure that they are provided with the training and supervision that enables them to do their works safely and without risk to health.
    </Text>
  </View>

  <View style={{ marginTop: 14 }}>
    {/* Título principal */}
    <Text style={styles.sectionTitle}>Safety Precautions</Text>

    {/* Subapartados */}
    <Text style={styles.label}>Safety Equipment</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Gloves, Goggles, Safety Boots, Hi-Viz and Face Mask – Please refer to the FastCoat MSDS.
    </Text>

    <Text style={styles.label}>Working from Heights</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      The Work from Height Regulations 2005
    </Text>

    <Text style={styles.label}>Safe Access</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>
      Safe access to a roof requires careful planning, particularly where work progresses along the roof. Typical methods to access roofs are:
    </Text>
    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>• general access scaffolds.</Text>
      <Text style={styles.text}>• stair towers.</Text>
      <Text style={styles.text}>• fixed or mobile scaffold towers.</Text>
      <Text style={styles.text}>• mobile access equipment.</Text>
      <Text style={styles.text}>• ladders; and</Text>
      <Text style={styles.text}>• roof access hatches.</Text>
      <Text style={styles.text}>• Access should be installed and signed off by the appropriate access professional.</Text>
    </View>

    <Text style={styles.label}>Roof edges and openings</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Access requirements should meet HSE regulations and guidelines when working at heights.
    </Text>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Flat roof detailing guidance & CDM') +1}
  />
</Page>

{/* =========================
    Página 9 – Safety Precautions (continuación)
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    {/* Continuación del mismo bloque principal */}

    <Text style={styles.label}>Fragile surfaces</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Always follow a safe system of work using a platform beneath the roof where possible. Work on or near fragile roof surfaces requires a combination of stagings,
      guard rails, fall restraint, fall arrest and safety nets slung beneath and close to the roof.
    </Text>
    <View style={{ marginLeft: 16, marginBottom: 16 }}>
      <Text style={styles.text}>
        • Fragile roofs: all roofs should be treated as fragile until a competent person has confirmed they are not. Do not trust any sheeted roof, whatever the material, to bear the weight of a person. This includes the roof ridge and purlins.
      </Text>
      <Text style={styles.text}>
        • Fragile rooflights are a particular hazard. Some are difficult to see in certain light conditions and others may be hidden by paint. You must provide protection in these areas, either by using barriers or covers that are secured and labelled with a warning.
      </Text>
    </View>

    <Text style={styles.label}>Electrical Hazards</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Be aware of overhead power lines.
    </Text>

    <Text style={styles.label}>Protection of landscape, Cars and Structures</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Ensure all areas are covered that are not part of the roof works to avoid damage, especially when using chemical cleaners and liquid waterproofing products.
    </Text>

    <Text style={styles.label}>Handling Chemicals</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Control of Substances Hazardous to Health (COSHH) Regulations 2002.
    </Text>

    <Text style={styles.label}>Temperature Limitations</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      +5°c to 35°c
    </Text>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Flat roof detailing guidance & CDM') +2}
  />
</Page>

  {/* =========================
    Página 10 – Roof Specification
   ========================= */}
{image && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    {/* Roof Specification Section */}
    <View style={{ marginTop: 24 }}>
      <Text style={styles.sectionTitle}>Roof Specification</Text>
      <Text style={[styles.text, { marginBottom: 30 }]}>
        Roof area covered in this specification: {reference || '________'}
      </Text>
    </View>

    {/* Imagen del proyecto */}
    <View
      style={{
        width: 400,
        height: 350,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#cccccc',
        marginBottom: 30,
      }}
    >
      <Image
        src={image}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </View>

    <PdfFooter
      guarantee={guarantee}
      pageNumber={getPageNumber('Roof specification') }
    />
  </Page>
)}


{/* =========================
    Página 11 — FastCoat: The Roof Build-Up (formulario)
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>The Roof Build-Up</Text>

  <Text style={{ fontSize: 12, marginBottom: 20 }}>
    With the information and images provided this specification is for <Text style={{ fontWeight: 'bold' }}>{reference || '________'}</Text>, which is approx. <Text style={{ fontWeight: 'bold' }}>{roofSize || '________'}</Text> and is a <Text style={{ fontWeight: 'bold' }}>{roofType || '________'}</Text>. <Text style={{ fontStyle: 'italic' }}>{roofBuildUp || ''}</Text>
  </Text>

  {/* Tabla tipo rows visuales */}
  <View style={{ borderTopWidth: 1, borderColor: '#ccc' }}>
    {/* Project Reference */}
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>Project Reference</Text>
      <Text style={{ fontSize: 12 }}>{reference || '________'}</Text>
    </View>

    {/* Roof Size */}
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>Roof Size</Text>
      <Text style={{ fontSize: 12 }}>{roofSize || '________'}</Text>
    </View>

    {/* Roof Type */}
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>Roof Type</Text>
      <Text style={{ fontSize: 12 }}>{roofType || '________'}</Text>
    </View>

    {/* Build Up */}
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>
        {roofType === 'Warm Roof' && 'Warm Roof Build Up'}
        {roofType === 'Inverted Roof' && 'Inverted Roof Build Up'}
        {!['Warm Roof', 'Inverted Roof'].includes(roofType || '') && 'Build Up'}
      </Text>

      <View>
        {roofType === 'Warm Roof' && [
          'Existing Substrate',
          'Elotene VCL',
          'Insulation',
          'Elotene Foil Faced Carrier',
          'FastCoat Pro Waterproof',
        ].map((item, i) => (
          <Text key={`warm-${i}`} style={{ fontSize: 12 }}>{item}</Text>
        ))}

        {roofType === 'Inverted Roof' && [
          'Existing Substrate',
          'FastCoat Pro Waterproof',
          'XPS Insulation',
          'WFRL',
          'Slabs / Ballast',
        ].map((item, i) => (
          <Text key={`inv-${i}`} style={{ fontSize: 12 }}>{item}</Text>
        ))}

        {!['Warm Roof', 'Inverted Roof'].includes(roofType || '') && [
          'Existing Substrate',
          'FastCoat Pro Waterproof',
        ].map((item, i) => (
          <Text key={`default-${i}`} style={{ fontSize: 12 }}>{item}</Text>
        ))}
      </View>
    </View>

    {/* Campos adicionales */}
    {[
      ...(roofType === 'Warm Roof' ? [['U Value Needed', uValue]] : []),
      ['Outlets', outlets],
      ['Skylights', skylights],
      ['AC Units', acUnits],
      ['Existing Coatings', existingCoatings],
      ['Ponding Water', pondingWater],
    ].map(([label, value], i) => (
      <View key={`extra-${i}`} style={{ flexDirection: 'row', paddingVertical: 6 }}>
        <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>{label}</Text>
        <Text style={{ fontSize: 12 }}>{value || '________'}</Text>
      </View>
    ))}
  </View>

  {/* Footer con clave EXACTA para índice de esta sección */}
  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('The roof build-up and preparation')}
  />
</Page>


{/* =========================
    Página 11.1 — FastCoat: The Roof Build Up & Preparation (sin intro duplicada)
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>

    {/* Preparation */}
    <Text style={styles.label}>Preparation</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Preparing a roof surface before applying FastCoat Waterproof is crucial for ensuring proper adhesion and longevity of the coating. Here are the steps to prepare a roof surface effectively:
    </Text>

    {/* 1. Inspection */}
    <Text style={styles.label}>1. Inspection</Text>
    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>
        • <Text style={styles.label}>Inspect the Roof:</Text> Look for any damage, such as cracks, blisters, or punctures. Note areas that require repair.
      </Text>
      <Text style={styles.text}>
        • <Text style={styles.label}>Check for Moisture:</Text> Ensure the roof is completely dry. Moisture trapped under the coating can cause bubbling and poor adhesion.
      </Text>
      <Text style={styles.text}>
        • LRS recommend carrying out core samples to determine the condition of the existing build up.
      </Text>
    </View>

    {/* 2. Cleaning */}
    <Text style={styles.label}>2. Cleaning</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      See the Cleaning section.
    </Text>

    {/* 3. Repairing */}
    <Text style={styles.label}>3. Repairing</Text>
    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>
        • <Text style={styles.label}>Repair Damage:</Text> Fix any cracks, blisters, or punctures. Use appropriate materials such as LRS PU Mastic for minor repairs.
      </Text>
      <Text style={styles.text}>
        • <Text style={styles.label}>Seal Joints and Seams:</Text> Use LRS PU Mastic to ensure all joints and seams are watertight.
      </Text>
      <Text style={styles.text}>
        • <Text style={styles.label}>Replace Damaged Sections:</Text> If parts of the roofing material are severely damaged, they should be replaced like for like.
      </Text>
    </View>

    {/* 4. Final Preparations */}
    <Text style={styles.label}>4. Final Preparations</Text>
    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>
        • <Text style={styles.label}>Masking:</Text> Protect areas that should not be coated using masking tape and protective coverings.
      </Text>
      <Text style={styles.text}>
        • <Text style={styles.label}>Mixing the Coating:</Text> Mix the FastCoat Waterproof thoroughly before application.
      </Text>
    </View>
  </View>

  {/* Footer con la CLAVE EXACTA y OFFSET +1 para el índice */}
  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('The roof build-up and preparation') +1}
  />
</Page>


{/* =========================
    Página 12 – The Roof Build Up & Preparation: Cleaning
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

      {/* 5. Safety Measures */}
      <Text style={styles.label}>5. Safety Measures</Text>
    <Text style={[styles.text, { marginBottom: 0 }]}>
      Please see page 9–10.
    </Text>

  <View style={{ marginTop: 14 }}>
    <Text style={styles.label}>Cleaning</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      <Text style={styles.label}>Objective:</Text>{' '}
      Ensure the roof surface is properly prepared for the application of FastCoat Pro Waterproof to achieve optimal adhesion and performance.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      <Text style={styles.label}>Safety Precautions:</Text>{' '}
      Please see pages 9–10.
    </Text>

    <Text style={styles.label}>Cleaning Steps:</Text>

    {/* 1. Clear Debris */}
    <Text style={styles.label}>1. Clear Debris</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Use a broom or leaf blower to remove loose debris such as leaves, twigs, and dirt.</Text>
      <Text style={styles.text}>• Check for and remove any nesting materials or other obstructions.</Text>
    </View>

    {/* 2. Pressure Washing */}
    <Text style={styles.label}>2. Pressure Washing</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • Use a 2000 psi pressure washer to thoroughly wash the roof. Start at the furthest point and work your way to your exit point.
      </Text>
    </View>

    {/* 3. 799 Wash N Prep */}
    <Text style={styles.label}>3. Apply 799 Wash N Prep if required</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • Mix 799 Wash N Prep at a ratio of 16:1 for general cleaning. 1 part 799 Wash N Prep and 16 parts clean water.
      </Text>
      <Text style={styles.text}>
        • Apply the 799 Wash N Prep to the roof using a pump sprayer or stiff-bristle brush. Allow to sit for 15–20 minutes before rinsing away with clean water.
      </Text>
      <Text style={styles.text}>
        • For stubborn stains, mix 1 part 799 Wash N Prep with 8 parts clean water and apply it to the affected areas. Let it sit for 15–20 minutes before rinsing with clean water.
      </Text>
    </View>

    {/* 4. Rinse Thoroughly */}
    <Text style={styles.label}>4. Rinse Thoroughly</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Rinse the roof thoroughly with clean water to remove all soap and cleaning solution residues.</Text>
      <Text style={styles.text}>• Ensure no cleaner is left behind as it can affect the adhesion of FastCoat Waterproof.</Text>
    </View>

    {/* 5. Inspect and Repair */}
    <Text style={styles.label}>5. Inspect and Repair</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Inspect the roof for any damage, such as cracks, splits, or holes. Repair minor issues with LRS PU Mastic.</Text>
      <Text style={styles.text}>• Ensure the roof surface is smooth and intact.</Text>
    </View>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Cleaning, TV, satellite arrays, cables') }
  />
</Page>

{/* =========================
    Página 13 – The Roof Build Up & Preparation: TV Aerials and Satellite Dish Arrays
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

    {/* 6. Drying */}
    <Text style={styles.label}>6. Drying</Text>
    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>
        • Allow the roof to dry completely before applying the waterproof coatings. This may take several hours to a full day, depending on weather conditions.
      </Text>
    </View>

    {/* Final Steps */}
    <Text style={styles.label}>Final Steps</Text>
    <View style={{ marginLeft: 16, marginBottom: 4 }}>
      <Text style={styles.text}>• Documentation: Take photos before and after cleaning to document the condition of the roof.</Text>
    </View>

  <View style={{ marginTop: 14 }}>
    <Text style={styles.label}>TV Aerials and Satellite Dish Arrays</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      Any TV aerials or satellite arrays that will impede the roofing works will need to be temporarily removed or raised to facilitate the works.
    </Text>

    <Text style={[styles.text, { marginBottom: 16 }]}>
      The contractor must liaise with the client directly in relation to how to best serve the property so that minimal disturbance of service is achieved throughout the roof works.
    </Text>

    <Text style={styles.label}>Cables</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      If a cable tray is not currently in situ, then consideration should be made to keep the cables from direct contact with the membrane.
    </Text>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Cleaning, TV, satellite arrays, cables') +1}
  />
</Page>

{/* =========================
    Página 14 (A) – MS 2-Part Primer
   ========================= */}
{fullyPrimedSurfaces.includes(surface) && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <View style={{ marginTop: 14 }}>
      <Text style={styles.sectionTitle}>MS 2-Part Primer</Text>

      <Text style={[styles.text, { marginBottom: 12 }]}>
        Priming the roof surface using MS 2-Part Primer is essential for ensuring proper adhesion of the FastCoat Waterproof coating,
        especially on surfaces like metal, single-ply, GRP, glass, plastic, concrete, brickwork, fibre cement, and existing coatings.
      </Text>

      <Text style={styles.label}>Steps to Prime the Surface:</Text>

      <Text style={styles.label}>1. Safety First</Text>
      <Text style={[styles.text, { marginBottom: 12 }]}>Please see pages 9–10.</Text>

      <Text style={styles.label}>2. Surface Preparation</Text>
      <View style={{ marginLeft: 16, marginBottom: 12 }}>
        <Text style={styles.text}>• Ensure the surface is clean, dry, and free from dust, debris, and grease.</Text>
        <Text style={styles.text}>• Follow the cleaning steps outlined previously if necessary (see page 12).</Text>
      </View>

      <Text style={styles.label}>3. Measure the Area</Text>
      <View style={{ marginLeft: 16, marginBottom: 12 }}>
        <Text style={styles.text}>• Measure the total area to be primed to ensure you mix the correct amount of MS 2-Part Primer.</Text>
        <Text style={styles.text}>• One 12.5 kg tin covers ≈ 62.5 m².</Text>
      </View>

      <Text style={styles.label}>4. Mix the MS 2-Part Primer</Text>
      <View style={{ marginLeft: 16, marginBottom: 12 }}>
        <Text style={styles.text}>• Mix Part A with Part B (4 : 1 ratio if part-mixing).</Text>
        <Text style={styles.text}>• Use a drill with mixing attachment or mixing stick for thorough mixing.</Text>
      </View>

      <Text style={styles.label}>5. Apply the Primer</Text>
      <View style={{ marginLeft: 16, marginBottom: 12 }}>
        <Text style={styles.text}>• Apply evenly with a short-pile roller, keeping straight strokes for uniform coverage.</Text>
        <Text style={styles.text}>• Ensure corners, edges and seams are adequately coated.</Text>
      </View>

      <Text style={styles.label}>6. Maintain Coverage Rate</Text>
      <View style={{ marginLeft: 16, marginBottom: 12 }}>
        <Text style={styles.text}>• Apply at ≈ 0.2 kg per m² (12.5 kg → 62.5 m² coverage).</Text>
      </View>

      <Text style={styles.label}>7. Drying Time</Text>
      <View style={{ marginLeft: 16, marginBottom: 12 }}>
        <Text style={styles.text}>• Allow 4–6 hours to dry before applying FastCoat Waterproof (coating times vary with conditions).</Text>
      </View>

    
    </View>

    <PdfFooter
      guarantee={guarantee}
      pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
    />
  </Page>
)}

{/* =========================
    Página 15 – MS 2-Part Primer
   ========================= */}
{fullyPrimedSurfaces.includes(surface) && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <View style={{ marginTop: 14 }}>
    

      <Text style={styles.label}>8. Clean Up</Text>
      <View style={{ marginLeft: 16 }}>
        <Text style={styles.text}>• Clean tools and equipment after use.</Text>
        <Text style={styles.text}>• Dispose of any leftover primer and containers according to local regulations.</Text>
      </View>
    </View>

    <PdfFooter
      guarantee={guarantee}
      pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
    />
  </Page>
)}


{/* =========================
    Página 14 (B) – Waterproofing Coverings
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Waterproofing Coverings</Text>

    <Text style={styles.label}>Existing Details, Terminations and Upstands</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      To ensure a durable and effective waterproofing system for a flat roof using FastCoat, it is essential to properly handle existing details, terminations, and upstands.
    </Text>

    <Text style={styles.label}>Steps for Existing Details, Terminations and Upstands:</Text>

    <Text style={styles.label}>1. Safety First</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>Please see pages 9–10.</Text>

    <Text style={styles.label}>2. Preparation of Existing Details</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>Please see page 11.</Text>

    <Text style={styles.label}>3. Ensuring Proper Height for Upstands</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Upstands should be a minimum of 150 mm high where possible to prevent water ingress.</Text>
      <Text style={styles.text}>• Measure the height and adjust if necessary to meet this requirement.</Text>
    </View>

    <Text style={styles.label}>4. Applying FastCoat Waterproof Coating</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>Please see page 16.</Text>

    <Text style={styles.label}>5. Terminating the Waterproofing System</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>
      There are four main methods to finish the FastCoat Waterproof system: self-terminated, termination bar, lead flashing, or cut into a chase filled with LRS PU Mastic.
    </Text>

    <Text style={styles.label}>Method 1: Self-terminating</Text>
    <View style={{ marginLeft: 16 }}>
      <Text style={styles.text}>• Mark the termination height of 150 mm using a string line or masking tape.</Text>
      <Text style={styles.text}>• Apply FastCoat Waterproof to specification up to the termination line.</Text>
      <Text style={styles.text}>• Ensure the FastCoat is fully bonded to the upstand leaving no voids or gaps for water ingress.</Text>
      <Text style={styles.text}>• Terminating the FastCoat is best practice; see below for other options.</Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>


{/* =========================
    Página 15 – Waterproofing Coverings (Continuation)
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>

    <Text style={styles.label}>Method 2: Using a Termination Bar</Text>
    <View style={{ marginLeft: 16, marginBottom: 10 }}>
      <Text style={styles.text}>• Measure and Cut: Measure and cut the termination bar to fit the length of the upstand.</Text>
      <Text style={styles.text}>• Position the Bar: Position the termination bar at the top edge of the waterproof coating, ensuring it is at least 150mm above the roof surface.</Text>
      <Text style={styles.text}>• Fasten the Bar: Secure the termination bar to the wall using suitable fixings.</Text>
      <Text style={styles.text}>• Seal with LRS PU Mastic: Apply LRS PU Mastic along the top edge of the termination bar to seal it.</Text>
    </View>

    <Text style={styles.label}>Method 3: Using Lead Flashing</Text>
    <View style={{ marginLeft: 16, marginBottom: 10 }}>
      <Text style={styles.text}>• Measure and Cut: Measure and cut the lead flashing to fit the length of the upstand.</Text>
      <Text style={styles.text}>• Install Flashing: Install the lead flashing at the top edge of the FastCoat waterproof coating, ensuring it covers the termination of the coating.</Text>
      <Text style={styles.text}>• Secure Flashing: Secure the lead flashing into the brickwork or wall by cutting a chase.</Text>
      <Text style={styles.text}>• Seal with LRS PU Mastic: Apply LRS PU Mastic along the edges of the lead flashing and into the chase to seal it.</Text>
    </View>

    <Text style={styles.label}>Method 4: Cutting into a Chase and Filling with LRS PU Mastic</Text>
    <View style={{ marginLeft: 16, marginBottom: 10 }}>
      <Text style={styles.text}>• Cut a Chase: Use a grinder or chisel to cut a chase (groove) into the wall at the top edge of the waterproof coating, at least 150mm above the roof surface.</Text>
      <Text style={styles.text}>• Clean the Chase: Clean out the chase to remove dust and debris.</Text>
      <Text style={styles.text}>• Waterproof: Apply FastCoat Waterproof into the chase to the correct FastCoat Specification.</Text>
      <Text style={styles.text}>• Fill with LRS PU Mastic: Embed the top edge of the waterproof coating into the chase. Once dry, fill the chase with LRS PU Mastic.</Text>
    </View>

    <Text style={styles.label}>6. Final Inspection</Text>
    <View style={{ marginLeft: 16 }}>
      <Text style={styles.text}>• Inspect all terminations and upstands to ensure they are properly sealed and finished.</Text>
      <Text style={styles.text}>• Check for any gaps or unsealed areas and repair where necessary.</Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* =========================
    Página 16 – FastCoat Waterproof as a Base Coat
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>FastCoat Waterproof as a Base Coat</Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      Applying FastCoat Waterproof with Reinforcement Matting ensures a robust and durable waterproofing system for your flat roof.
    </Text>

    <Text style={styles.label}>Steps for Applying FastCoat Waterproof and Reinforcement Matting:</Text>

    <Text style={styles.label}>1. Safety First</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>Please see pages 9–10.</Text>

    <Text style={styles.label}>2. Surface Preparation</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Ensure the surface is clean, dry, and free from dust, debris, and grease.</Text>
      <Text style={styles.text}>• Follow the cleaning and priming steps outlined previously if necessary.</Text>
    </View>

    <Text style={styles.label}>3. Mixing FastCoat Waterproof</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • Thoroughly mix the FastCoat Waterproof prior to application. Use a drill and mixing attachment or mixing stick to ensure uniform consistency.
      </Text>
    </View>

    <Text style={styles.label}>4. Measure and Cut Reinforcement Matting</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Measure the roof area and cut the Reinforcement Matting to size.</Text>
      <Text style={styles.text}>• Ensure edges are overlapped by approximately 50mm using the furry edge.</Text>
    </View>

    <Text style={styles.label}>5. Application of FastCoat Waterproof</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• <Text style={{ fontWeight: 'bold' }}>First Section:</Text> Start with a manageable section of the roof.</Text>
      <Text style={styles.text}>• <Text style={{ fontWeight: 'bold' }}>Coverage Rate:</Text> Apply at 1.5kg per m² using a short-pile roller or brush for even application.</Text>
      <Text style={styles.text}>
        • <Text style={{ fontWeight: 'bold' }}>Embed Reinforcement Matting:</Text> While still wet, embed the Reinforcement Matting into the FastCoat Waterproof. Ensure it lies flat and smooth without wrinkles or air bubbles.
      </Text>
      <Text style={styles.text}>• Overlap adjacent pieces of Reinforcement Matting by 50mm to ensure a continuous and strong layer.</Text>
    </View>

    <Text style={styles.label}>6. Embedment</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • Use the roller to press the Reinforcement Matting firmly into the FastCoat Waterproof, ensuring good saturation and adhesion.
      </Text>
      <Text style={styles.text}>
        • Apply additional FastCoat Waterproof on top of the matting if necessary to ensure full saturation and coverage.
      </Text>
    </View>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* =========================
    Página 17 – FastCoat Waterproof as a Base Coat (Technical Data)
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • Once the Reinforcement Matting has broken down and softened, ensure embedment is completed to remove all pinholes.
      </Text>
    </View>

    <Text style={styles.label}>7. Repeat Process</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • Move to the next section of roof and repeat the application process, ensuring each piece of matting overlaps the previous one by 50mm.
      </Text>
    </View>

    <Text style={styles.label}>8. Drying Time</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • Allow the FastCoat Waterproof and Reinforcement Matting to dry, typically 2–4 hours before applying any topcoats or additional layers.
      </Text>
    </View>

    <Text style={styles.label}>9. Clean Up</Text>
    <View style={{ marginLeft: 16 }}>
      <Text style={styles.text}>• Clean tools and equipment after use.</Text>
      <Text style={styles.text}>• Dispose of any leftover materials and containers according to local regulations.</Text>
    </View>

    <Text style={[styles.text, { marginBottom: 8 }]}>
      Single component, moisture-curing polyurethane.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      <Text style={styles.label}>Container Size:</Text> 25kg
    </Text>

    <Text style={styles.label}>Coverage Rates (Typical)</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• 1.5kg / m² (Smooth Surface) – 16.6m² / 25kg tin</Text>
      <Text style={styles.text}>• 1.75kg / m² (Rough Surface) – 14.3m² / 25kg tin</Text>
      <Text style={styles.text}>
        • Allowance should be made for additional coverage rates for embedment of the Reinforcement Matting at low temperatures.
      </Text>
    </View>

    <Text style={styles.label}>Typical Drying Times at 15°C</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Touch Dry – 3 hours</Text>
      <Text style={styles.text}>• Minimum Over Coat – 4 hours</Text>
      <Text style={styles.text}>• Full Cure – 7 days</Text>
    </View>

    <Text style={styles.label}>Storage</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • FastCoat should be stored between 5°C and 20°C and kept out of the weather elements.
      </Text>
    </View>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* =========================
    Página 18 – Steps for Inspecting and Repairing FastCoat Waterproof
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.label}>Application Temperatures</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • FastCoat is based on surface temperature and should be applied between +5°C and a maximum surface temperature of 35°C.
      </Text>
    </View>

    <Text style={styles.label}>FastCoat Base Coat – Inspect</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>
      Inspecting the FastCoat Waterproof is a crucial step to ensure there are no imperfections such as pinholes or wicks that could compromise the waterproofing system.
    </Text>

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Steps for Inspecting and Repairing FastCoat Waterproof</Text>

    <Text style={styles.label}>1. Safety First</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>Please see pages 9–10.</Text>

    <Text style={styles.label}>2. Initial Inspection</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • <Text style={{ fontWeight: 'bold' }}>Visual Check:</Text> Begin with a visual inspection of the entire roof surface. Look for any visible defects such as pinholes, air bubbles, or wicks.
      </Text>
      <Text style={styles.text}>
        • <Text style={{ fontWeight: 'bold' }}>Lighting:</Text> Use a flashlight or inspection light to illuminate the surface. This helps identify small pinholes and imperfections that may not be visible under normal lighting conditions.
      </Text>
    </View>

    <Text style={styles.label}>3. Identifying Pinholes</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Mark pinholes with a marker or chalk to ensure they are easy to locate during the repair process.</Text>
      <Text style={styles.text}>• Check all areas, including edges, corners, and around details where Reinforcement Matting has been used.</Text>
    </View>

    <Text style={styles.label}>4. Repairing Pinholes</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Clean the area around the pinholes to ensure it is free from dust and debris.</Text>
      <Text style={styles.text}>• Apply LRS PU Mastic using a sealant gun to fill the pinholes completely.</Text>
      <Text style={styles.text}>• Smooth the surface to ensure a level finish.</Text>
    </View>

    <Text style={styles.label}>5. Dealing with Wicks or Fibres</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Lightly sand any wicks or fibres standing proud using 80-grit sandpaper. Sand gently to avoid damaging the surrounding FastCoat Waterproof.</Text>
      <Text style={styles.text}>• Wipe the sanded area with a clean cloth to remove dust.</Text>
    </View>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>


{/* =========================
    Página 19 – FastCoat Waterproof as a TopCoat
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.label}>6. Ensuring Full Coverage</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Check the entire roof area to ensure full coverage with FastCoat Waterproof.</Text>
      <Text style={styles.text}>• Verify that Reinforcement Matting is properly embedded, fully saturated, and overlaps are done by at least 50mm.</Text>
    </View>

    <Text style={styles.label}>7. Detail Inspection</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Pay close attention to details and edges. Ensure all areas with Reinforcement Matting are thoroughly inspected and coated.</Text>
      <Text style={styles.text}>• Confirm that all terminations and upstands are completed and properly coated.</Text>
    </View>

    <Text style={styles.label}>8. Final Inspection</Text>
    <View style={{ marginLeft: 16 }}>
      <Text style={styles.text}>• Perform a final comprehensive check of the entire roof area, identifying any missed spots or imperfections.</Text>
      <Text style={styles.text}>• Address any remaining issues with LRS PU Mastic, ensuring all repairs are smooth and level before recoating.</Text>
    </View>

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>FastCoat Waterproof as a TopCoat</Text>

    <Text style={[styles.text, { marginBottom: 8 }]}>
      Applying the FastCoat Waterproof is a critical final step in creating a durable and watertight flat roof.
    </Text>

    <Text style={styles.label}>Steps for Applying FastCoat Waterproof as a TopCoat:</Text>

    <Text style={styles.label}>1. Safety First</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>Please see pages 9–10.</Text>

    <Text style={styles.label}>2. Inspect the BaseCoat</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• Check for pinholes: Ensure all pinholes have been filled and the surface is smooth.</Text>
      <Text style={styles.text}>• Clean surface: Make sure the surface is clean and free from dust and debris. See page 14.</Text>
    </View>

    <Text style={styles.label}>3. Reactivation of the Surface (if required)</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • If the BaseCoat has been left for more than 14 days, you must reactivate the surface using MS 2-Part Primer.
      </Text>
      <Text style={styles.text}>
        • Apply the primer as per LRS instructions and allow it to dry completely before applying the FastCoat Waterproof.
      </Text>
    </View>

    <Text style={styles.label}>4. Mixing the FastCoat Waterproof</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
    </View>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* Página 20 - FastCoat Waterproof as a TopCoat */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.text}>
  • Thoroughly mix the FastCoat Waterproof before application. Use a drill with mixing attachment or mixing stick to ensure uniform consistency.
      </Text>

  <Text style={styles.label}>5. Application of FastCoat Waterproof</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>• <Text style={{ fontWeight: 'bold' }}>Coverage Rate:</Text> Apply the FastCoat Waterproof at a coverage rate of 1 kg per m².</Text>
      <Text style={styles.text}>• Apply evenly using a short-pile roller or brush. Ensure consistent thickness and avoid streaks or thin areas.</Text>
      <Text style={styles.text}>• Apply in consistent, straight strokes to achieve an even finish.</Text>
    </View>

    <Text style={styles.label}>6. Drying Time</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • Allow the FastCoat Waterproof to dry for 2–4 hours, depending on environmental conditions such as temperature and humidity.
      </Text>
    </View>

    <Text style={styles.label}>7. Final Inspection</Text>
    <View style={{ marginLeft: 16 }}>
      <Text style={styles.text}>• Check the roof to ensure the FastCoat Waterproof has been applied evenly across the entire surface.</Text>
      <Text style={styles.text}>• Perform any necessary touch-ups with additional FastCoat Waterproof to cover missed spots or thin areas.</Text>
    </View>

  <Text style={styles.label}>
    Single component, moisture curing polyurethane.
  </Text>
  <Text style={styles.text}>Container Size – 25kg</Text>

  <Text style={[styles.label, { marginTop: 10 }]}>Coverage Rates (Typical)</Text>

  <Text style={styles.text}>
    • {guarantee === '25-year'
        ? '1.4kg / m² (Smooth Surface) – 17.86m² / 25kg tin'
        : '1kg / m² (Smooth Surface) – 25m² / 25kg tin'}
  </Text>

  <Text style={styles.text}>
    • {guarantee === '25-year'
        ? '2kg / m² (Rough Surface) – 12.5m² / 25kg tin'
        : '1.5kg / m² (Rough Surface) – 16.6m² / 25kg tin'}
  </Text>

  <Text style={[styles.text, { marginTop: 10 }]}>
    Allowance should be made for additional coverage rates for embedment of
    the Reinforcement Matting at low temperatures.
  </Text>

  <Text style={[styles.text, { marginTop: 10 }]}>Typical Drying Times at 15°c</Text>
  <Text style={styles.text}>Touch Dry – 3 hours</Text>
  <Text style={styles.text}>Minimum Over Coat – 4 hours</Text>
  <Text style={styles.text}>Full Cure – 7 days</Text>

  <PdfFooter guarantee={guarantee}  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++} />
</Page>

{/* Página 21 (2 part) - FastCoat Waterproof as a TopCoat */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={[styles.label, { marginTop: 10 }]}>Storage</Text>
  <Text style={styles.text}>
    FastCoat should be stored between 5°c and 20°c and kept out of the weather
    elements.
  </Text>

  <Text style={[styles.label, { marginTop: 10 }]}>Application Temperatures</Text>
  <Text style={styles.text}>
    FastCoat is based on surface temperature and should be applied between +5°c
    and the maximum surface temperature is 35°c.
  </Text>

  <PdfFooter guarantee={guarantee}  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++} />
</Page>


{/* =========================
    Página 22 – Completed Roof Surface
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Completed Roof Surface</Text>

    {/* Subtítulo en una sola línea */}
    <Text wrap={false} style={[styles.label, { width: 'auto', fontSize: 11, marginBottom: 10 }]}>
      Guide to Visual Inspection of the Completed Roof Surface
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      <Text style={styles.label}>Objective:</Text>{' '}
      Conduct a thorough visual inspection of the completed roof surface to ensure there are no pinholes, the coverage is even,
      details are correctly applied at 150mm, and Reinforcement Matting is properly installed over the entire roof area.
    </Text>

    <Text style={[styles.text, { marginBottom: 12 }]}>
      <Text style={styles.label}>Safety Precautions:</Text>{' '}
      Please see pages 9–10.
    </Text>

    {/* Steps */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Steps for Visual Inspection:</Text>

    {/* Initial Overview */}
    <Text style={[styles.label, { width: 'auto' }]}>• Initial Overview:</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>o Walk around the perimeter of the roof to get an initial overview of the surface.</Text>
      <Text style={styles.text}>o Take note of any obvious defects or areas that require closer inspection.</Text>
    </View>

    {/* Check for Pinholes */}
    <Text style={[styles.label, { width: 'auto' }]}>• Check for Pinholes:</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>o Visual Scan: Perform a visual scan of the entire roof surface. Look closely for pinholes.</Text>
      <Text style={styles.text}>o Detailed Areas: Pay extra attention to seams, edges, and details where pinholes are more likely to occur.</Text>
    </View>

    {/* Ensure Even Coverage */}
    <Text style={[styles.label, { width: 'auto' }]}>• Ensure Even Coverage:</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        o Uniform Thickness: Verify that the FastCoat Waterproof is consistent across the entire roof. There should be no thin spots or exposed substrate.
      </Text>
      <Text style={styles.text}>
        o Edges and Corners: Check edges, corners, and transitions to ensure they are fully coated and have no exposed areas.
      </Text>
      <Text style={styles.text}>
        o Colour Consistency: Look for colour consistency across the surface, as variations can indicate uneven application.
      </Text>
    </View>

    {/* Inspect Details at 150mm */}
    <Text style={[styles.label, { width: 'auto' }]}>• Inspect Details at 150mm:</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        o Measure Height: Use a measuring tape to check that details such as terminations, upstands, and other critical points are coated to a minimum height of 150mm where possible.
      </Text>
      <Text style={styles.text}>
        o Detail Work: Ensure all details are properly sealed and the FastCoat Waterproof is applied consistently at the required height.
      </Text>
    </View>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>
 
{/* =========================
    Página 23 – Completed Roof Surface (Continuation)
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>

    {/* Verify Reinforcement Matting */}
    <Text style={[styles.label, { width: 'auto' }]}>• Verify Reinforcement Matting:</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        o Visible Matting: Inspect areas where Reinforcement Matting was applied. The matting should be fully embedded with no exposed edges.
      </Text>
      <Text style={styles.text}>
        o Coverage: Ensure the matting covers all critical areas, such as joints, seams, and around roof penetrations.
      </Text>
      <Text style={styles.text}>
        o Bonding: Check that the matting is well-bonded to the substrate and there are no air pockets or wrinkles.
      </Text>
    </View>

    {/* Final Checks */}
    <Text style={[styles.label, { width: 'auto' }]}>• Final Checks:</Text>
    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>o Seams and Joints: Verify that all seams and joints are fully sealed and there are no gaps or openings.</Text>
      <Text style={styles.text}>o Overall Condition: Assess the overall condition of the roof surface. Ensure it looks uniform and well-maintained.</Text>
    </View>

    {/* Document Findings */}
    <Text style={[styles.label, { width: 'auto' }]}>• Document Findings:</Text>
    <View style={{ marginLeft: 16 }}>
      <Text style={styles.text}>
        o Photographic Evidence: Take photos of the roof surface, especially any areas of concern or interest. Capture before and after images if any touch-up work is required.
      </Text>
      <Text style={styles.text}>
        o Detailed Notes: Write detailed notes on your findings, including any defects, areas that need additional work, and the overall condition of the roof.
      </Text>
    </View>

     {/* Addressing Issues */}
     <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Addressing Issues:</Text>
    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>
        • <Text style={{ fontWeight: 'bold' }}>Pinholes:</Text> Mark any pinholes with chalk or tape. Prepare a small amount of LRS PU Mastic to fill in the pinholes before reapplying FastCoat Waterproof.
      </Text>
      <Text style={styles.text}>
        • <Text style={{ fontWeight: 'bold' }}>Uneven Coverage:</Text> Apply additional FastCoat Waterproof to any areas with insufficient coverage to achieve uniform thickness.
      </Text>
      <Text style={styles.text}>
        • <Text style={{ fontWeight: 'bold' }}>Detail Adjustments:</Text> Correct any issues with details that are not at the required 150mm height where possible. Apply additional coating if necessary.
      </Text>
      <Text style={styles.text}>
        • <Text style={{ fontWeight: 'bold' }}>Reinforcement Matting:</Text> Ensure any improperly applied Reinforcement Matting is corrected by applying additional FastCoat Waterproof and embedding new Reinforcement Matting as needed.
      </Text>
    </View>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* =========================
    Página 24 – Completed Roof Surface (Continuation)
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>


    {/* Traffic Coat Section */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>
      Traffic Coat Provisions for Walkways, Maintenance Routes, etc.:
    </Text>

    <Text style={[styles.text, { marginBottom: 8 }]}>
      Once the LRS FastCoat Waterproof has fully cured, Traffic Coat can be applied.
    </Text>

    <View style={{ marginLeft: 16, marginBottom: 8 }}>
      <Text style={styles.text}>
        • LRS Traffic Coat is applied in 2 coats (<Text style={{ fontStyle: 'italic' }}>Holding Layer</Text> &amp; <Text style={{ fontStyle: 'italic' }}>Seal Coat</Text>) and typically cures in 30 minutes.
      </Text>
      <Text style={styles.text}>
        • <Text style={{ fontWeight: 'bold' }}>Holding Layer:</Text> Apply at 0.2kg/m² and while Traffic Coat is still wet, immediately broadcast to saturation, completely blinding the surface with 3kg/m² of Emery Aggregate.
      </Text>
      <Text style={styles.text}>
        • Once the Base Layer has fully cured (typically in 30 minutes), brush and bag up all the loose aggregate before applying the Seal Coat.
      </Text>
      <Text style={styles.text}>
        • <Text style={{ fontWeight: 'bold' }}>Seal Coat:</Text> Apply at 0.2kg/m² ensuring the aggregate is encapsulated.
      </Text>
      <Text style={styles.text}>
        • Ensure all masking tape is removed once the walkway is complete and the Seal Coat is still wet to leave a crisp edge.
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* =========================
    Página 25 – General Guidance and Requirements
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>General Guidance and Requirements</Text>

    {/* Drying Out – Equipment */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Drying Out – Equipment:</Text>
    <Text style={[styles.text, { marginBottom: 6 }]}>
      These are readily available commercially from local tool plant hire companies.
    </Text>
    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>• Leaf Blowers</Text>
      <Text style={styles.text}>• Hot Air Blower</Text>
      <Text style={styles.text}>• Roof Pumps</Text>
    </View>

    {/* Defects */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Defects:</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      This specification provided by LRS is written on the basis that the substrates, roof deck and structures are sound and suitable.
      We cannot accept responsibility for the consequences of defects in the roof deck or structure.
    </Text>

    {/* Installation */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Installation:</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      All LRS Waterproofing Systems are to be installed in accordance with this specification.
    </Text>

    {/* Building Works */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Building Works:</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      It is the contractor’s responsibility to ensure suitable protection of semi-completed or completed works.
    </Text>

    {/* Protection of Works */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Protection of Works:</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      It is the contractor’s responsibility to ensure any relating plant, equipment or materials being stored or placed onto the
      waterproofing membrane are sufficiently protected.
    </Text>

    {/* Delays */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Delays:</Text>
    <View style={{ marginLeft: 16 }}>
      <Text style={styles.text}>
        • All or general areas: Overcoating must be carried out within 14 days of the application of the preceding coat (Primer or Waterproofing).
      </Text>
      <Text style={styles.text}>
        • Coatings that are over 14 days will need to be re-activated using LRS MS 2-Part Primer at a coverage of 0.2kg per m².
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('General guidance and requirements') }
  />
</Page>

{/* =========================
    Página 26 – General Guidance – Requirements
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>General Guidance – Requirements</Text>

    {/* Prepared Surfaces – Requirement */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>
      Prepared Surfaces – Requirement:
    </Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Prepared surfaces and substrates to receive the new FastCoat Pro Waterproofing Membrane must be prepared all in accordance with this
      specification and must be clean from all dirt, dust and loose materials. In addition, all surfaces must be dry before application.
    </Text>

    {/* Storage */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Storage:</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      All LRS materials must always be stored indoors between 5°c and 20°c.
    </Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      <Text style={styles.label}>Note:</Text> Coverage rates are adversely affected by high and low application temperatures.
    </Text>

    {/* Safe Working */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Safe Working:</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      All works are to be carried out in accordance with the current Health and Safety Legislation. Please see pages 9–10.
    </Text>

    {/* Inclement Weather Protection */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>
      Inclement Weather Protection:
    </Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      If rain is due, no LRS Waterproofing coatings should be laid.
    </Text>
    <Text style={styles.text}>
      The contractor must ensure at the end of each day that any exposed membranes or substrates that are susceptible to damage through water ingress
      are sealed and protected to ensure complete water tightness.
    </Text>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('General guidance and requirements') +1 }
  />
</Page>

{/* =========================
    Página 27 – Maintenance After Installation
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    {/* Title */}
    <Text style={styles.sectionTitle}>Maintenance After Installation</Text>

    {/* Maintenance Guidelines */}
    <Text style={[styles.text, { marginBottom: 12 }]}>
      The new roof coverings should be managed in accordance with the recommendations of BS6229:2003 with regards to ongoing maintenance.
    </Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      They should be routinely inspected and cleared of any debris every spring and autumn. This will need to be undertaken more often if the roof
      is surrounded by trees or similar vegetation.
    </Text>
    <Text style={[styles.text, { marginBottom: 20 }]}>
      Please note that failure to follow maintenance guidelines can invalidate the product guarantee.
    </Text>

    {/* Guarantee Section */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Guarantee – Materials Only</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Materials only. The following guarantee specification is covered by LRS product guarantee for the period of{' '}
      {guarantee === '20' ? '20 years' : '25 years'} from the date of practical completion.
    </Text>
    <Text style={styles.text}>
      <Text style={styles.label}>Please Note:</Text> Only waterproofing products supplied by LRS will be covered in this guarantee.
    </Text>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('General guidance and requirements') +2}
  />
</Page>

{/* =========================
    Página 28 – Photographic Evidence
   ========================= */}
{photos?.length > 0 && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <Text style={styles.sectionTitle}>Photographic Evidence</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Photographs provided for reference during or after the installation process.
    </Text>

    <View
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      {photos.slice(0, 4).map((src, idx) => (
        <View
          key={idx}
          style={{
            width: '48%',
            height: 250,
            marginBottom: 12,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#cccccc',
            padding: 4,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Image
            src={src}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </View>
      ))}
    </View>

    <PdfFooter
      guarantee={guarantee}
      pageNumber={getPageNumber('Photographs')}
    />
  </Page>
)}


{/* =========================
    Página 29 – Materials & Guarantee + Sign-off
   ========================= */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    {/* Materials */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 6 }]}>Materials</Text>
    <Text style={[styles.text, { marginBottom: 16 }]}>TBC</Text>

    {/* Guarantee */}
    <Text style={[styles.label, { width: 'auto', marginBottom: 8 }]}>Guarantee:</Text>
    <Text style={[styles.text, { marginBottom: 8 }]}>
      Materials only. The following guarantee-specification is covered by LRS product guarantee for the period of{' '}
      {guarantee === '25-year' ? '25-years' : '20-years'} from the date of practical completion.
    </Text>
    <Text style={[styles.text, { marginBottom: 28 }]}>
      <Text style={styles.label}>Please Note:</Text> Only products supplied by LRS will be covered in this guarantee.
    </Text>

    {/* Sign-off */}
    <Text style={[styles.textBold, { marginBottom: 18 }]}>Kind Regards</Text>

{/* Signatures + Contact (two columns) */}
<View style={{ flexDirection: 'row', gap: 24 }}>
  {/* Paul Jones */}
  <View style={{ flex: 1 }}>
    <Image
      src="/firma.png"
      style={{ width: 160, height: 50, objectFit: 'contain', marginBottom: 6 }}
    />
    <Text style={[styles.textBold, { fontSize: 13, marginTop: 6 }]}>Paul Jones</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>LRS Technical Manager</Text>

    <Text style={styles.text}>T: 01948 841 877</Text>
    <Text style={styles.text}>E: paul.jones@lrs-systems.co.uk</Text>
    <Text style={styles.text}>W: www.lrs-systems.co.uk</Text>
  </View>

  {/* Tom Shone */}
  <View style={{ flex: 1 }}>
    <Image
      src="/firmat.png"
      style={{ width: 160, height: 50, objectFit: 'contain', marginBottom: 6 }}
    />
    <Text style={[styles.textBold, { fontSize: 13, marginTop: 6 }]}>Tom Shone</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>Managing Director</Text>

    <Text style={styles.text}>T: 07415 116280</Text>
    <Text style={styles.text}>E: tomshone@lrs-systems.co.uk</Text>
    <Text style={styles.text}>W: www.lrs-systems.co.uk</Text>
  </View>
</View>


  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Materials & Guarantee')}
  />
</Page>

{/* Página final - estilo profesional como la imagen 2 */}

<Page size="A4" style={{ padding: 0, margin: 0 }}>
  {/* Imagen superior */}
  <Image src="/2F.png" style={{ width: '100%' }} />

  {/* Contenido inferior, compactado */}
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 60,
      paddingTop: 30,
      paddingBottom: 40, // usamos el espacio inferior útil
      height: 'auto',
    }}
  >
    {/* Columna izquierda */}
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: '#f5a623',
          marginBottom: 10,
        }}
      >
        LIQUID ROOFING SYSTEMS LTD
      </Text>

      <Text style={{ fontSize: 12, marginBottom: 3 }}>
        Roofing House, Prees Green, Whitchurch, SY13 2BN
      </Text>
      <Text style={{ fontSize: 12, marginBottom: 3 }}>
        01948 841 877
      </Text>
      <Text style={{ fontSize: 12, marginBottom: 3 }}>
        enquiries@lrs-systems.co.uk
      </Text>
      <Text style={{ fontSize: 12, color: '#f5a623' }}>
        www.lrs-systems.co.uk
      </Text>
    </View>

    {/* Columna derecha: logo alineado con el texto */}
    <Image
      src="https://i.postimg.cc/YCt945rK/1lrs-1.png"
      style={{ width: 110, marginTop: 6 }}
    />
  </View>
</Page>


  </Document>
  );
};

export default PdfDocumentFastCoat;