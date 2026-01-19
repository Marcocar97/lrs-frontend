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
    width: 200,
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
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 12,
    marginBottom: 12,
  },
  
  tableRow: {
    flexDirection: "row",
  },
  
  tableHeaderCell: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  
  tableCell: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  
  tableCellCenter: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },  
  contentsDivider: {
    height: 1,
    backgroundColor: '#d9d9d9',
    marginTop: 2,
    marginBottom: 10,
  },

  contentsContainer: {
    marginTop: 4,
  },

  contentsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },

  contentsIndex: {
    width: 16,
    fontSize: 11,
  },

  contentsTitle: {
    flexGrow: 1,
    fontSize: 11,
  },

  contentsDots: {
    fontSize: 8,
    marginHorizontal: 4,
  },

  contentsPage: {
    width: 20,
    fontSize: 11,
    textAlign: 'right',
  },
});


/*
  
const getGuaranteeText = (guarantee) => {
    return guarantee === '20-year'
      ? 'RapidRoof Pro 20 Specification'
      : 'RapidRoof 10 Specification';
  };

  */ 

  const getGuaranteeText = (guarantee) => {
    const isPro = guarantee === "20-year" || guarantee === "25-year";
    return isPro
      ? "RapidRoof Pro 20 Specification"
      : "RapidRoof 10 Specification";
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
  
  
  const PdfDocument = ({
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
        'Asbestos', 'Concrete', 'Existing Coatings', 'Single-Ply', 'VCL'
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
                guarantee === '20-year'
                  ? 'https://i.postimg.cc/QxGVDBvM/20-1.jpg'
                  : 'https://i.postimg.cc/8PRczpVm/10-1.jpg'
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
    
    
    const getWaterproofPagesCount = ({ guarantee, surface, antiSkid }) => {
      const isFullyPrimed = fullyPrimedSurfaces.includes(surface);
      let count = 20;
      const includesPrimer = guarantee === '20-year' || (guarantee === '10-year' && isFullyPrimed);
      if (!includesPrimer) count -= 2;
      if (antiSkid !== 'Yes') count -= 2;
      return count;
    };
    
    const waterproofPageCount = getWaterproofPagesCount({ guarantee, surface, antiSkid });
    
    const baseSections = [
      { title: 'Project details', pages: 1 },
      { title: 'Preliminaries & general conditions', pages: 1 },
      { title: 'Existing falls, change in scope of works', pages: 1 },
      { title: 'Existing roof condition', pages: 1 },
      { title: 'Adhesion test, compliance with building regulations', pages: 1 },
      { title: 'Flat roof detailing guidance & CDM', pages: 1 },
      { title: 'Safety precautions', pages: 4 },
      { title: 'Roof specification', pages: 1 },
      { title: 'The roof build-up and preparation', pages: 2 },
      { title: 'Cleaning, TV, satellite arrays, cables', pages: 2 },
      { title: 'Outlets', pages: 1 },
      { title: 'Multi-Purpose Filler', pages: 2 },
      { title: 'Waterproof coverings', pages: waterproofPageCount },
      { title: 'Schedule of products', pages: 2 },
      { title: 'General guidance and requirements', pages: 2 },
      { title: 'Photographs', pages: 1 },
      { title: 'Materials and Guarantee', pages: 1 },
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
  <Image src="/techo.png" style={{ width: '100%' }} />

  {/* Contenido central más protagonista */}
  <View style={{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    textAlign: 'center'
  }}>
    {/* Logo: MUCHO más grande */}
    <Image
      src={guarantee === '20-year'    ? 'https://i.postimg.cc/QxGVDBvM/20-1.jpg'
                  : 'https://i.postimg.cc/8PRczpVm/10-1.jpg'}
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

  
 {/* Página 2: Contents */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 18 }}>
    {/* Título del índice */}
    <Text style={styles.sectionTitle}>Contents</Text>

    {/* Línea fina debajo del título */}
    <View style={styles.contentsDivider} />

    {/* Lista de contenidos */}
    <View style={styles.contentsContainer}>
      {pageIndex.map(({ title, page }, idx) => (
        <View key={idx} style={styles.contentsRow}>

          {/* Título */}
          <Text style={styles.contentsTitle}>{title}</Text>

          {/* Puntos de guía (dot leaders) */}
          <Text style={styles.contentsDots}>
            ................................................................
          </Text>

          {/* Nº de página */}
          <Text style={styles.contentsPage}>{page}</Text>
        </View>
      ))}
    </View>
  </View>

  <PdfFooter guarantee={guarantee} pageNumber={2} />
</Page>




      {/* Página 3: Detalles del Proyecto */}
      <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

  {/* Título principal */}
<Text style={[styles.sectionTitle, { fontSize: 18, marginBottom: 30 }]}>
  {guarantee === '20-year'
    ? 'RapidRoof Pro 20 Specification'
    : 'RapidRoof 10 Specification'} Ref: {lrsReference || 'LRS – [ref]'}
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


 
{/*Pagina 4 */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
  <Text style={styles.sectionTitle}>Preliminaries and General Conditions</Text>

  <Text style={[styles.text, { marginBottom: 12 }]}>
    <Text style={styles.label}>Planning Your Installation:</Text>{' '}
    It is recommended that you familiarise yourself with the installation procedure and any site-specific peculiarities. (See ‘Site Visit’ below).
  </Text>

  {guarantee === '20-year' && (
    <Text style={[styles.text, { marginBottom: 12 }]}>
      All LRS PRO system specifications need to be undertaken by ‘LRS Approved’ operatives.
    </Text>
  )}

  <Text style={[styles.text, { marginBottom: 12 }]}>
    <Text style={styles.label}>Site Visit:</Text>{' '}
    It is recommended that the Contractor undertakes a site visit to ascertain access to the site and the working area. Consideration should be given to:
  </Text>

  <View style={{ marginLeft: 16, marginBottom: 16 }}>
    <Text style={styles.text}>• The height of the roof.</Text>
    <Text style={styles.text}>• The protection from falling and safeguarding the public from objects falling from the roof (e.g. double handrail and heras fencing).</Text>
    <Text style={styles.text}>• Access for operatives and materials (to the site and the working area).</Text>
    <Text style={styles.text}>• The provision of safe site storage / compound / welfare facilities.</Text>
    <Text style={styles.text}>• The removal of debris and waste.</Text>
  </View>

  <Text style={[styles.text, { marginBottom: 12 }]}>
    All roofing materials are to be supplied by Liquid Roofing Systems Ltd (LRS), to be fit for purpose and of the type and quality herein. Any sub-standard materials will be rejected. No alternatives are to be substituted.
  </Text>

  <Text style={[styles.text, { marginBottom: 12 }]}>
    The contractor shall employ no-one, but LRS approved, competent tradesmen and the whole of the works shall be carried out and completed in accordance to the correct{' '}
    <Text style={styles.label}>
      {guarantee === '20-year' ? 'RapidRoof Pro Specification' : 'RapidRoof Specification'}
    </Text>.
  </Text>

  <Text style={[styles.text, { marginBottom: 20 }]}>
    <Text style={styles.label}>Waterproofing Only:</Text>{' '}
    This specification is based on a waterproofing-only overlay of an existing roof covering and does not include thermal insulation.
  </Text>
</View>


 
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Preliminaries & general conditions')} />
</Page>


{/* Página 5 */}

{(guarantee === '10-year' || guarantee === '20-year') && (
  <Page size="A4" style={styles.page}>
     <PdfHeader reference={reference} />

     <View style={{ marginTop: 14 }}>
  <Text style={styles.sectionTitle}>Existing falls, change in scope of works</Text>

  <View style={{ marginBottom: 16 }}>
    <Text style={[styles.label, { marginBottom: 4 }]}>Measuring the Roof:</Text>
    <Text style={styles.text}>
      It is important to accurately measure your roof to determine the amount of materials required (including a realistic amount for wastage – guide minimum 10% of the gross surface area).
    </Text>
    <Text style={[styles.text, { marginTop: 6 }]}>
      The roof area should include all areas to be coated including upstands and perimeter details etc.
    </Text>
  </View>

  <View style={{ marginBottom: 16 }}>
    <Text style={[styles.label, { marginBottom: 4 }]}>Existing Falls:</Text>
    <Text style={styles.text}>
      RapidRoof will follow the contours of the existing surface. Falls and any deviations will be replicated. As a result, some areas of standing water may occur. Please note the accumulation of ice, frost or ponding water will not have an adverse effect on the RapidRoof membrane.
    </Text>
    <Text style={[styles.text, { marginTop: 6 }]}>
      This applies to the life expectancy and/or the long-term performance of the system and will not affect the product guarantee in any way.
    </Text>
  </View>

  <View>
    <Text style={[styles.label, { marginBottom: 4 }]}>Changes in Scope of Works:</Text>
    <Text style={styles.text}>
      LRS must be informed immediately of any proposed requirements to change, and the approved contractor must not implement any changes until agreed by LRS.
    </Text>
    <Text style={[styles.text, { marginTop: 6 }]}>
      LRS will not be responsible for any changes of which they are not aware of or have not authorised, nor will they accept any liability or associated cost due to system failure.
    </Text>
  </View>
</View>


     {/* Pie de página */}
    {/* Existing falls, change in scope of works */}
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Existing falls, change in scope of works')} />
  </Page>
)}

{/* Página 6 */}
<Page size="A4" style={styles.page}>
<PdfHeader reference={reference} />


<View style={{ marginTop: 14 }}>
  <Text style={styles.sectionTitle}>Existing Roof Condition</Text>

  <Text style={[styles.text, { marginBottom: 12 }]}>
    The existing roof build-up should be inspected for defects and made good where required.
  </Text>

  <Text style={[styles.text, { marginBottom: 12 }]}>
    Taking core samples of several random areas to obtain information of the sub-structure below the roof surface is highly recommended. This is the responsibility of the roofing contractor and could help prevent any unforeseen issues arising during or after application.
  </Text>

  <Text style={[styles.text, { marginBottom: 12 }]}>
    Any areas where the insulation or the underlying substrate has collapsed, is defective or decayed, should be cut out, repaired, and reinstated on a like-for-like basis to provide a good solid base for the new coating system.
  </Text>

  <Text style={styles.text}>
    No claims can be considered by Liquid Roofing Systems Ltd should there be any latent defects resulting from faulty decking or substrate.
  </Text>
</View>

<View style={{ marginTop: 14 }}>
  <Text style={styles.sectionTitle}>Natural Growth/Vegetation</Text>

  <View style={{ marginLeft: 16 }}>
    <Text style={styles.text}>• Remove all existing vegetation by mechanical extraction.</Text>
    <Text style={styles.text}>• LRS 799 Wash-N-Prep may be used to remove stubborn staining / growth. Consult separate data sheet for more further information.</Text>
    <Text style={styles.text}>• Wash off any 799 Wash-N-Prep residues before applying any LRS waterproof coatings.</Text>
    <Text style={styles.text}>• 1no. 799 Wash-N-Prep 1ltr bottle will clean approx. 148m² at a ratio of 16:1 with clean water.</Text>
    <Text style={styles.text}>• 799 Wash N Prep can be added to either a pump sprayer or as an attachment on a power washer.</Text>
    <Text style={styles.text}>• For general cleaning add 250ml of 799 Wash N Prep to 4ltrs of clean water.</Text>
    <Text style={styles.text}>• For heavy duty cleaning add 500ml of 799 Wash N Prep to 4ltrs of clean water.</Text>
    <Text style={styles.text}>• Once applied the 799 Wash N Prep should be left for a minimum of 15 minutes to allow the stubborn stains to loosen.</Text>
    <Text style={styles.text}>• The roof should be power washed using clean water to remove any loosened material and residue.</Text>
  </View>
</View>

  {/* Pie de página */}
  {/* Existing roof condition */}
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Existing roof condition')} />

</Page>



{/* Página 8 - Adhesion Test */}

<Page size="A4" style={styles.page}>
<PdfHeader reference={reference} />

 {/* Adhesion Test */}
<View style={{ marginTop: 14 }}>
<Text style={styles.sectionTitle}>Adhesion Test</Text>

<Text style={styles.label}>Test Areas</Text>

<View style={{ marginLeft: 16, marginBottom: 20 }}>
  {/* Línea igual en todas las garantías */}
  <Text style={styles.text}>
    Clean and remove all dust and contamination before performing test patches. Prime using LRS RapidRoof Primer at 0.3kg per m² and allow to dry.
  </Text>

  {/* Bloque condicional según garantía */}
  {guarantee === '20-year' ? (
    <>
      <Text style={styles.text}>
        The contractor must document and record the identified test areas after applying RapidRoof BaseCoat.
      </Text>
      <Text style={styles.text}>
        RapidRoof BaseCoat applied at 1.25kg per m² and fully reinforced using RapidRoof Reinforcement Matting.
      </Text>
      <Text style={styles.text}>
        The RapidRoof BaseCoat must be allowed to fully cure for 24 hours prior to the addition test being undertaken.
      </Text>
    </>
  ) : (
    <>
      <Text style={styles.text}>
        The contractor must document and record the identified test areas after applying RapidRoof Waterproof.
      </Text>
      <Text style={styles.text}>
        RapidRoof Waterproof applied at 1kg per m².
      </Text>
      <Text style={styles.text}>
        The Waterproof must be allowed to fully cure for 24 hours prior to the addition test being undertaken.
      </Text>
    </>
  )}

  {/* Línea final igual en todas las garantías */}
  <Text style={styles.text}>
    Should the adhesion test fail the contractor must inform LRS immediately upon their findings so that alternative measures can be agreed before the main works commence.
  </Text>
</View>


  {/* Compliance */}
  <Text style={styles.label}>Compliance with Building Regulations</Text>

  <Text style={[styles.text, { marginBottom: 12 }]}>
    You should ensure that the design of the roof to which RapidRoof is to be applied is in accordance with current regulations, codes and good practice. For further guidance consult with:
  </Text>

  <View style={{ marginLeft: 16 }}>
    <Text style={styles.text}>• BS6229 (Code of Practice for flat roofs with continuously supported coverings).</Text>
    <Text style={styles.text}>• BS5250 (Control of Condensation in Buildings).</Text>
    <Text style={styles.text}>• Local Authority Building Control regarding compliance with regulations or seek professional advice.</Text>
  </View>
</View>


  {/* Adhesion test, compliance with building regulations */}
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Adhesion test, compliance with building regulations')} />
</Page>

{/* Página 9 - Flat Roof Detailing */}

<Page size="A4" style={styles.page}>
<PdfHeader reference={reference} />

{/* Flat Roof Detailing Guidance */}
<View style={{ marginTop: 14 }}>
  <Text style={styles.sectionTitle}>Flat Roof Detailing Guidance</Text>

  <View style={{ marginLeft: 16, marginBottom: 24 }}>
    <Text style={styles.text}>• Any redundant roof details should be removed prior to the commencement of works. The roof area underneath made good as required, ensuring that it matches the build-up of the surrounding roof area.</Text>
    <Text style={styles.text}>• Termination details should have a minimum 150mm upstand height above the finished surface of the roof and should be terminated into a chase or have a suitable cover flashing or weathering flange. Any details that are unable to meet the 150mm should be terminated using a termination bar or LRS PU mastic.</Text>
    <Text style={styles.text}>• Any details where this cannot be achieved should be periodically inspected and {guarantee === '10-year' ? 'require annual maintenance.' : 'may require occasional maintenance.'}</Text>
    <Text style={styles.text}>• All detailing surfaces to be coated on are fully prepared and primed as per the main specification.</Text>
    <Text style={styles.text}>• The detailing should be dressed as far as possible into all outlets (minimum 150mm).</Text>
    <Text style={styles.text}>• Care should be taken to ensure all roof details comply with:</Text>

    <View style={{ marginLeft: 12, marginTop: 8 }}>
      <Text style={styles.text}>• BS 6229 Guidance (Flat Roofs with Continuously Supported Membranes)</Text>
      <Text style={styles.text}>• Guide 7.1 (Flat Roofs and Balconies) of the NHBC Standards 2020</Text>
      <Text style={styles.text}>• Liquid Roofing and Waterproofing Association Design Guide for Liquid Applied Waterproofing Systems for Roofs and Balconies, Issue 1, 2020</Text>
    </View>
  </View>

  {/* CDM */}
  <Text style={styles.sectionTitle}>CDM</Text>

  <View style={{ marginLeft: 16 }}>
    <Text style={styles.text}>• CDM Regulations are applicable to all construction projects – commercial or domestic.</Text>
    <Text style={styles.text}>• The Contractor’s responsibilities include:</Text>
    <Text style={styles.text}>  - Ensuring that all employed/appointed workers have the skills, knowledge, training, and experience to carry out the works, or are in the process of obtaining them.</Text>
    <Text style={styles.text}>  - Providing appropriate supervision, information, and instructions to workers under their control.</Text>
  </View>
</View>


{/* Flat roof detailing guidance & CDM */}
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Flat roof detailing guidance & CDM')} />
</Page>


{/* Página 10 – Safety Precautions */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginLeft: 16 }}>
  <Text style={styles.text}>• Operatives should take an active part in helping to manage health and safety risks. Responsibilities include:</Text>
  <Text style={styles.text}>  - Only carrying out construction work if they have the relevant skills, knowledge, training, and experience. Alternatively, operatives need to ensure that they are provided with the training and supervision that enables them to do their works safely and without risk to health.</Text>
</View>

<View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Safety Precautions</Text>

    <View style={{ marginLeft: 16, marginBottom: 24 }}>
      <Text style={styles.text}>
        Safety Equipment – Gloves, Goggles, Safety Boots, Hi-Viz and Face Mask – please refer to the RapidRoof MSDS.
      </Text>

      <Text style={styles.text}>
        Working from Heights – The Work from Height Regulations 2005.
      </Text>

      <Text style={styles.text}>
        Safe Access – safe access to a roof requires careful planning, particularly where work progresses along the roof.
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        Typical methods to access roofs are:
      </Text>

      <Text style={styles.text}>• General access scaffolds.</Text>
      <Text style={styles.text}>• Stair towers.</Text>
      <Text style={styles.text}>• Fixed or mobile scaffold towers.</Text>
      <Text style={styles.text}>• Mobile access equipment.</Text>
      <Text style={styles.text}>• Ladders; and</Text>
      <Text style={styles.text}>• Roof access hatches.</Text>

      <Text style={styles.text}>
        {guarantee === '20-year'
          ? '• Access should be installed and signed off by an appropriate access professional.'
          : '• Access should be installed and signed off be the appropriate access professional.'
        }
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        Roof edges and openings
      </Text>

      <Text style={styles.text}>
        • Access requirements should meet HSE regulation guidelines when working at height.
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        Fragile surfaces
      </Text>

      <Text style={styles.text}>
        Always follow a safe system of work using a platform beneath the roof where possible. Work on or near fragile roof surfaces requires a combination of stagings, guard rails, fall restraint, fall arrest and safety nets slung beneath and close to the roof.
      </Text>
    </View>
  </View>

  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Safety precautions')} />
</Page>

{/* Página 11 – Safety Precautions */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    
    <Text style={styles.text}>
      • Fragile roofs: all roofs should be treated as fragile until a competent person has confirmed they are not. Do not trust any sheeted roof, whatever the material, to bear the weight of a person. This includes the roof ridge and purlins.
    </Text>

    <Text style={[styles.text, { marginTop: 12 }]}>
      • Fragile rooflights are a particular hazard. Some are difficult to see in certain light conditions and others may be hidden by paint. You must provide protection in these areas, either by using barriers or covers that are secured and labelled with a warning.
    </Text>

    <View style={{ marginLeft: 16, marginBottom: 24, marginTop: 20 }}>
      <Text style={styles.text}>
        Electrical Hazards – be aware of overhead power lines.
      </Text>

      <Text style={styles.text}>
        Protection of landscape, cars and structures – ensure all areas not part of the roof works are covered to avoid damage, especially when using chemical cleaners and liquid waterproofing products.
      </Text>

      <Text style={styles.text}>
        Handling Chemicals – Control of Substances Hazardous to Health (COSHH) Regulations 2002.
      </Text>

      <Text style={styles.text}>
        Temperature Limitations – 0°C to 35°C.
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        Safety Advice for Using RapidRoof PMMA
      </Text>

      <Text style={styles.text}>
        • Objective: ensure safe handling, application, and storage of RapidRoof PMMA (polymethyl methacrylate) roofing products to prevent accidents and health hazards.
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        • Safety Precautions:
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        • Personal Protective Equipment (PPE):
      </Text>

      <Text style={styles.text}>
        • Gloves: wear chemical-resistant gloves to protect your hands from exposure to PMMA.
      </Text>

      <Text style={styles.text}>
        • Goggles: use safety goggles to protect your eyes from splashes.
      </Text>

      <Text style={styles.text}>
        • Respirator: use a respirator with organic vapour cartridges if working in poorly ventilated areas to avoid inhaling fumes.
      </Text>

      <Text style={styles.text}>
        • Clothing: wear long sleeves, long trousers and closed-toe shoes to minimise skin exposure.
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        • Ventilation:
      </Text>

      <Text style={styles.text}>
        • Work outdoors: whenever possible, apply PMMA products outdoors or in well-ventilated areas.
      </Text>

    </View>
  </View>

  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Safety precautions') + 1} />
</Page>

{/* Página 12 – Safety Precautions */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>

  <Text style={styles.text}>
        • Indoor application: use fans or other ventilation systems to ensure adequate airflow when working indoors.
      </Text>

<Text style={styles.text}>
  • Handling and Storage:
</Text>

<Text style={styles.text}>
  • Storage: store PMMA products in a cool, dry place away from direct sunlight and sources of ignition. Keep containers tightly closed when not in use. Keep inside between 5°C to 20°C.
</Text>

<Text style={styles.text}>
  • Handling: avoid spilling or splashing. Handle containers with care to prevent leaks and spills.
</Text>

<Text style={styles.text}>
  • Fire Safety: PMMA products are flammable. Keep away from open flames, sparks and other sources of ignition. Have fire extinguishing equipment readily available.
</Text>

<Text style={[styles.text, { marginTop: 12 }]}>
  • Mixing and Application:
</Text>

<Text style={styles.text}>
  • Mixing: follow LRS instructions for mixing PMMA products. Avoid creating dust or aerosols during mixing.
</Text>

<Text style={styles.text}>
  • Application Tools: use appropriate tools such as rollers and brushes. Clean tools thoroughly after use.
</Text>

<View style={{ marginLeft: 16, marginBottom: 6, marginTop: 6 }}>
  <Text style={styles.text}>
    First Aid Measures:
  </Text>

  <Text style={styles.text}>
    • Inhalation: move to fresh air immediately if you experience dizziness, headaches, or difficulty breathing. Seek medical attention if symptoms persist.
  </Text>

  <Text style={styles.text}>
    • Skin Contact: wash exposed skin thoroughly with soap and water. Remove contaminated clothing and wash before reuse. Seek medical attention if irritation persists.
  </Text>

  <Text style={styles.text}>
    • Eye Contact: rinse eyes immediately with plenty of water for at least 15 minutes. Seek medical attention if irritation persists.
  </Text>

  <Text style={styles.text}>
    • Ingestion: do not induce vomiting. Rinse mouth thoroughly and seek medical attention immediately.
  </Text>

  <Text style={[styles.text, { marginTop: 6 }]}>
    • Environmental Protection:
  </Text>

  <Text style={styles.text}>
    • Spill Containment: in case of a spill, contain and collect the material using inert absorbents (e.g., sand or vermiculite). Dispose of in accordance with local regulations.
  </Text>

</View>
</View>

  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Safety precautions') + 2} />
</Page>

{/* Pagina 13 – Safety Precautions (continuación) */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 16 }}>

  <Text style={styles.text}>
    • Waste Disposal: dispose of unused PMMA products and contaminated materials according to local environmental regulations. Do not pour into drains or waterways.
  </Text>

  <Text style={[styles.text, { marginTop: 12 }]}>
    • Emergency Procedures:
  </Text>

  <Text style={styles.text}>
    • Fire: use carbon dioxide, dry chemical or foam extinguishers to combat small fires involving PMMA products. Do not use water jet as it may spread the fire.
  </Text>

  <Text style={styles.text}>
    • Spill Response: evacuate the area and ventilate. Use personal protective equipment during clean-up. Contain the spill and dispose of the waste properly.
  </Text>

    <Text style={styles.text}>
      • Best Practices:
    </Text>

    <Text style={styles.text}>
      • Training: ensure all personnel handling PMMA products are trained on proper use, potential hazards and emergency procedures.
    </Text>

    <Text style={styles.text}>
      • Labelling: clearly label all PMMA containers with the product name, hazard warnings and safety instructions.
    </Text>

    <Text style={styles.text}>
      • Monitoring: regularly monitor air quality in the work area to ensure ventilation systems are effective in reducing airborne concentrations of hazardous substances.
    </Text>

    <Text style={styles.text}>
      • Documentation: keep Material Safety Data Sheets (MSDS) for PMMA products accessible to all personnel. Review and understand the information provided in the MSDS.
    </Text>

    <Text style={[styles.text, { marginTop: 12 }]}>
      By following these safety guidelines, you can minimise the risk of accidents and health hazards when using RapidRoof PMMA products. Ensuring proper handling, storage and personal protection will help maintain a safe working environment.
    </Text>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Safety precautions') +3}
  />
</Page>


{/* Página 14 - Roof Specification */}

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


    {/* IMAGEN DEL PROYECTO */}


<View
  style={{
    width: 400, // similar a 48% del ancho de A4 con padding incluido
    height: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    border: '1pt solid #ccc',
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



    {/* Roof specification */}
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Roof specification')} />
  </Page>
)}


{/* pagina 15 The roof build up */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>
  The Roof Build-Up
</Text>


  <Text style={{ fontSize: 12, marginBottom: 20 }}>
    With the information and images provided this specification is for <Text style={{ fontWeight: 'bold' }}>{reference || '________'}</Text>, which is approx. <Text style={{ fontWeight: 'bold' }}>{roofSize || '________'}</Text> and is a <Text style={{ fontWeight: 'bold' }}>{roofType || '________'}</Text>.
    <Text style={{ fontStyle: 'italic' }}>{roofBuildUp || ''}</Text>
  </Text>

  {/* Tabla tipo rows visuales */}
  <View style={{ borderTopWidth: 1, borderColor: '#ccc' }}>
    {/* Project Reference */}
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>Project Reference</Text>
      <Text style={{ fontSize: 12 }}>{reference || '________'}</Text>
    </View>
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>Roof Size</Text>
      <Text style={{ fontSize: 12 }}>{roofSize || '________'}</Text>
    </View>
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>Roof Type</Text>
      <Text style={{ fontSize: 12 }}>{roofType || '________'}</Text>
    </View>

    {/* Build Up */}
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>
        {roofType === 'Warm Roof' && 'Warm Roof Build Up'}
        {roofType === 'Inverted Roof' && 'Inverted Roof Build Up'}
      </Text>
      <View>
        {roofType === 'Warm Roof' && [
          'Existing Substrate',
          'Elotene VCL',
          'Insulation',
          'Elotene Foil Faced Carrier',
          'RapidRoof Pro Waterproof',
        ].map((item, i) => (
          <Text key={i} style={{ fontSize: 12 }}>{item}</Text>
        ))}

        {roofType === 'Inverted Roof' && [
          'Existing Substrate',
          'RapidRoof Pro Waterproof',
          'XPS Insulation',
          'WFRL',
          'Slabs / Ballast',
        ].map((item, i) => (
          <Text key={i} style={{ fontSize: 12 }}>{item}</Text>
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
      <View key={i} style={{ flexDirection: 'row', paddingVertical: 6 }}>
        <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>{label}</Text>
        <Text style={{ fontSize: 12 }}>{value || '________'}</Text>
      </View>
    ))}
  </View>

  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('The roof build-up and preparation')} />
</Page>


{/* Página 16 - Preparation */} 

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

 {/* Preparation Section */}
 <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Preparation</Text>

    <View style={{ marginLeft: 16, marginBottom: 24 }}>
      <Text style={styles.text}>
        The contractor is to carry out their own inspection to satisfy themselves with the
        extent of the works involved in the preparation of the existing roof coverings and
        substrate.
      </Text>

      <Text style={styles.text}>
        No claims arising from failure to do so will be considered by LRS.
      </Text>

      {/* ÚNICA DIFERENCIA ENTRE 20-year Y 10-year */}
      {guarantee === '10-year' && (
        <Text style={styles.text}>
          All cracks and splits within the existing surface should be filled prior to the
          application of the RapidRoof system. Either with RapidRoof Pro Detailer or
          RapidRoof Multi-Purpose Filler.
        </Text>
      )}

      <Text style={styles.text}>
        Once the roof has been sufficiently prepared, the whole roof area requiring
        waterproofing should remain clean. Sweep away any dust etc between coats.
      </Text>

      <Text style={styles.text}>
        The surface must be dry before and during application.
      </Text>

      <Text style={styles.text}>
        Any blisters will need to be checked and dried out before over coating with
        RapidRoof.
      </Text>

      <Text style={styles.text}>
        All mechanical damage will need to be made good where necessary.
      </Text>

      <Text style={styles.text}>
        FastCoat Pro PU Joint Sealer should be used in replacement where mastic exists.
      </Text>
    </View>
  </View>


  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('The roof build-up and preparation') + 1} />
</Page>

{/* Página 17 - Cleaning (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* Cleaning Section */}
  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Cleaning</Text>

    {/* Título – cambia Pro en 20-year */}
    <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
      Guide to Cleaning a Roof for RapidRoof
      {guarantee === '20-year' ? ' Pro Waterproof Application' : ' Waterproof Application'}
    </Text>

    {/* Objetivo – cambia Pro en 20-year */}
    <View style={{ marginLeft: 16, marginBottom: 20 }}>
      <Text style={styles.text}>
        <Text style={styles.label}>Objective:</Text> ensure the roof surface is properly prepared for the application of RapidRoof
        {guarantee === '20-year' ? ' Pro Waterproof' : ' Waterproof'} to achieve optimal adhesion and performance.
      </Text>

      {/* Safety pages cambia */}
      <Text style={styles.text}>
        <Text style={styles.label}>Safety Precautions:</Text> please see pages 9 - 12.
      </Text>

      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Cleaning Steps:
      </Text>

      <Text style={styles.text}>
        • Clear Debris - use a broom or leaf blower to remove loose debris such as leaves, twigs and dirt. Check for and remove any nesting materials or other obstructions.
      </Text>

      <Text style={styles.text}>
        • Pressure Washing - use a 2000psi pressure washer to thoroughly wash the roof. Start at the furthest point away from the roof access, working to your exit point.
      </Text>

      <Text style={[styles.text, { marginTop: 12 }]}>
        799 Wash N Prep (if required)
      </Text>

      {/* Diferencia 1 – aplicación del limpiador */}
      {guarantee === '20-year' && (
        <>
          <Text style={styles.text}>
            • Apply Cleaning Solution - mix 799 Wash N Prep roof cleaner with water according to the product instructions. Apply the cleaning solution to the roof.
          </Text>

          <Text style={styles.text}>
            • Using a stiff-bristle brush, scrub gently to remove grime, algae and mildew. Mixing ratio is 1 part 799 and 16 parts water.
          </Text>
        </>
      )}

      {guarantee === '10-year' && (
        <Text style={styles.text}>
          • Apply Cleaning Solution - mix 799 Wash N Prep roof cleaner with water according to the product instructions. Apply the cleaning solution to the roof using a stiff-bristle brush. Scrub gently to remove grime, algae and mildew. Mixing ratio is 1 part 799 and 16 parts water.
        </Text>
      )}

      <Text style={styles.text}>
        • For stubborn stains or mould, mix 1 part 799 and 8 parts water and apply it to the affected areas. Let it sit for 15-20 minutes before rinsing.
      </Text>

      {/* Diferencia 2 – segundo pressure washing solo 10-year */}
      {guarantee === '10-year' && (
        <Text style={styles.text}>
          • Pressure Washing - use a 2000psi pressure washer to thoroughly wash the roof. Start from the top and work your way down. Maintain a safe distance to avoid damaging the roofing material with excessive pressure.
        </Text>
      )}

      {/* Resto del texto (idéntico) */}
      <Text style={styles.text}>
        • Rinse Thoroughly - rinse the roof thoroughly with clean water to remove all soap and cleaning solution residues. Ensure no cleaner is left behind as it can affect the adhesion of RapidRoof
        {guarantee === '20-year' ? ' Pro Waterproof' : ' Waterproof'}.
      </Text>

      <Text style={styles.text}>
        • Inspect and Repair - inspect the roof for any damage, such as cracks, loose shingles or holes. Repair minor issues with RapidRoof Pro Detailer. Ensure the roof surface is smooth and intact.
      </Text>

      <Text style={styles.text}>
        • Drying - allow the roof to dry completely before applying RapidRoof Primer. This may take several hours to a full day, depending on weather conditions.
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Cleaning, TV, satellite arrays, cables')}
  />
</Page>



{/* Pagina 18  Cleaning, TV, satellite arrays, cables (2 pages)  */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>Final Steps:</Text>

      <Text style={styles.text}>
        • Protection - cover any landscaping or structures near the roof with
        tarpaulin to protect them from cleaning runoff.
      </Text>

      <Text style={styles.text}>
        • Documentation - take photos before and after cleaning to document the
        condition of the roof.
      </Text>

{/* TV Aerials Section */}
<Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
  TV Aerials and Satellite Dish Arrays
</Text>
<Text style={[styles.text, { marginBottom: 8 }]}>
  Any TV aerials or satellite arrays that will impede the roofing works will need to be temporarily removed or raised to facilitate the works.
</Text>
<Text style={[styles.text, { marginBottom: 8 }]}>
  The contractor must liaise with the client directly in relation to how to best serve the property so that minimal disturbance of service is achieved throughout the roof works.
</Text>

{/* Cables Section */}
<Text style={[styles.textBold, { marginTop: 10, marginBottom: 6 }]}>
  Cables
</Text>
<Text style={styles.text}>
  If a cable tray is not currently in situ, consideration should be made to keep the cables from direct contact with the membrane.
</Text>

<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Cleaning, TV, satellite arrays, cables') + 1} />
</Page>


{/* Página 19 - Outlets (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* Outlets Section */}
<Text style={styles.sectionTitle}>Outlets</Text>

<Text style={[styles.textBold, { marginBottom: 8 }]}>
  Guide to Applying {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} into Roof Rainwater Outlets (RWO)
</Text>

<Text style={[styles.text, { marginBottom: 14 }]}>
  Objective: Properly apply {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} into roof Outlets, ensuring the waterproofing extends as far into the outlet as possible and creating a durable, watertight seal.
</Text>

<Text style={[styles.text, { marginBottom: 14 }]}>
  Safety Precautions: Please see pages 8-11
</Text>


{/* Preparations Steps */}
<Text style={[styles.textBold, { marginTop: 14, marginBottom: 6 }]}>Preparation Steps:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    "Remove Outlet Grates -carefully remove all outlet grates to allow access to the interior of the outlets.",
    "Clean the Outlets -ensure the roof surface and outlets are clean, dry, and free from debris, dust, and any loose material. Use a brush or cloth to clean inside the outlets thoroughly.",
    "Inspect for Damage - inspect the outlets for any cracks, splits, or damages that need repair. Use RapidRoof Pro Detailer to repair minor damages.Allow repairs to fully cure."
  ].map((item, idx) => (
    <Text key={idx} style={styles.text}>• {item}</Text>
  ))}
</View>

{/* Aplication Steps */}
<Text style={styles.text}> <Text style={styles.label}> Aplication Steps:</Text>  Please see pages 21 onwards for application.</Text> 

<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Outlets')} />
</Page>



{/* Página 20 – Ponding Water / Filling Cracks and Joints (1/2) */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Ponding Water / Filling Cracks and Joints</Text>

    {/* Título guía – solo 10-year */}
    {guarantee === '10-year' && (
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Guide to Using RapidRoof Multi-Purpose Filler for Roofing
      </Text>
    )}

    {/* OBJETIVO – cambia “Use” */}
    <Text style={styles.text}>
      <Text style={styles.label}>Objective:</Text>{' '}
      {guarantee === '20-year'
        ? 'Use RapidRoof Multi-Purpose Filler (resin and aggregate) to fill ponding areas on a roof, ensuring a level surface that promotes proper drainage and prevents water accumulation. Also used for filled large cracks or splits within the existing surface.'
        : 'RapidRoof Multi-Purpose Filler (resin and aggregate) to fill ponding areas on a roof, ensuring a level surface that promotes proper drainage and prevents water accumulation. Also used for filled large cracks or splits within the existing surface.'}
    </Text>

    {/* Safety Precautions – cambia páginas */}
    <Text style={styles.text}>

<Text style={styles.label}>Safety Precautions:</Text> please see pages 9 - 12.

</Text>

    <View style={{ marginLeft: 16, marginBottom: 12, marginTop: 12 }}>
      {/* PREPARATION STEPS */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Preparation Steps:
      </Text>

      <Text style={styles.text}>
        • Identify ponding areas, cracks or splits: locate all areas on the roof where water ponds or has cracks and splits. Measure the size and depth of these areas to determine the amount of RapidRoof Multi-Purpose Filler needed.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
      • Clean the roof: ensure the roof is clean, dry and free from debris, dust and loose material.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Inspect for damage: inspect the areas for any underlying damage. Repair any minor cracks or splits using RapidRoof Pro Detailer. Allow repairs to {guarantee === '20-year' ? 'fully cure.' : 'cure fully.'}
      </Text>

      {/* MIXING STEPS */}
      <Text style={[styles.textBold, { marginTop: 6, marginBottom: 6 }]}>
        Mixing Steps:
      </Text>

      {/* Línea extra SOLO 10-year */}
      {guarantee === '10-year' && (
        <Text style={styles.text}>
          • RapidRoof Primer should be applied before the application of the Multi-Purpose Filler, this should be applied at 0.3kg per m².
        </Text>
      )}

      <Text style={styles.text}>
        • Prepare the components:
      </Text>

      <Text style={styles.text}>
        • Resin: the binding component.
      </Text>
      <Text style={styles.text}>
        • Aggregate: the filler material.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Determine the mixing ratio: follow LRS instructions for the correct ratio of resin to aggregate. Typically, the ratio is provided by weight or volume.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Measure and mix: resin - measure the required amount of resin and pour it into a clean mixing container.
      </Text>

      <Text style={styles.text}>
        • Aggregate: measure the required amount of aggregate. Catalyst is premixed with the aggregate.
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Multi-Purpose Filler')}
  />
</Page>


{/* Página 21 – Ponding Water / Filling Cracks and Joints (2/2) */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <View style={{ marginLeft: 16, marginBottom: 24 }}>
      

      <Text style={styles.text}>
        • Mix thoroughly: gradually add the aggregate to the resin while continuously mixing. Use a mixing stick or drill with a mixing attachment to blend the components until the mixture is uniform and has a consistent texture.
      </Text>

      {/* APPLICATION STEPS */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Application Steps:
      </Text>

      <Text style={styles.text}>
        • Apply RapidRoof Multi-Purpose Filler: use a trowel to apply the mixed RapidRoof Multi-Purpose Filler to the ponding areas, cracks or splits. RapidRoof Primer should be applied before the application of the RapidRoof Multi-Purpose Filler.
      </Text>

      <Text style={styles.text}>
        • Ensure the filler is pressed firmly into the area, filling it completely and removing any air pockets.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Level the surface: use a level to ensure the filled area is even with the surrounding roof surface. Smooth the surface of the filled area to match the roof profile. Remove any excess filler and ensure a neat finish.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Allow to dry: allow RapidRoof Multi-Purpose Filler to dry, this is typically 20 minutes. The drying time may vary based on environmental conditions and the specific product used.
      </Text>

      {/* FINAL INSPECTION */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Final Inspection and Protection:
      </Text>

      <Text style={styles.text}>
        • Inspect the filled area: check the filled area for any signs of shrinkage, cracking or other imperfections. If necessary, apply additional filler and smooth again.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Clean up: clean all tools and equipment immediately after use.
      </Text>

      <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Document the Repair:
    </Text>

    <Text style={styles.text}>
      • Take photos before, during and after the application to document the condition of the roof and the work completed.
    </Text>

     {/* Maintenance */}
     <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
      Maintenance:
    </Text>

    <Text style={styles.text}>
      • Regular inspection: regularly inspect the roof to ensure that no new ponding areas, cracks or splits have developed and that the filled areas remain intact.
    </Text>

    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Multi-Purpose Filler') + 1}
  />
</Page>


{/* Página 22 - Waterproof Coverings */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* Document the Repair */}
  <View style={{ marginTop: 14, marginLeft: 16 }}>

    <Text style={styles.text}>
      • Proper drainage: ensure that roof drains, gutters and downspouts are clear and functioning properly to prevent water accumulation.
    </Text>
  </View>

  {/* Waterproof Coverings Section */}
  <View style={{ marginTop: 20 }}>
    <Text style={styles.sectionTitle}>Waterproof Coverings</Text>

    <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
      20 minutes curing time
    </Text>

    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Timing Considerations:
    </Text>

    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>
        • 20-minute cure time:
      </Text>

      <Text style={styles.text}>
        – Work quickly: due to the 20-minute cure time, work in small, manageable sections. Mix only the amount of product that can be applied within this timeframe.
      </Text>

      <Text style={styles.text}>
        – Monitor conditions: monitor the weather conditions and temperature closely. Higher temperatures can accelerate the curing process, reducing the working time.
      </Text>

      <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
        Curing process:
      </Text>

      <Text style={styles.text}>
        – Inspect application: immediately after application, inspect for any bubbles, wrinkles or uncoated areas and smooth out as necessary.
      </Text>

      <Text style={styles.text}>
        – Allow to cure: within 20 minutes, the {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} will begin to cure. Ensure no traffic or disturbance occurs during this time or for a period of up to 1 hour after mixing.
      </Text>
    </View>

    {/* Final Inspection & Protection */}
    <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
      Final Inspection and Protection:
    </Text>

    <View style={{ marginLeft: 16, marginBottom: 12 }}>
      <Text style={styles.text}>
        • Inspect and smooth:
      </Text>

      <Text style={styles.text}>
        – Inspect the applied coatings for any imperfections. Smooth out any areas{guarantee === '20-year' ? '' : ','} if necessary, before the product fully cures.
      </Text>

      <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
        Allow to cure completely:
      </Text>

      <Text style={styles.text}>
        – Allow all applied {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} products to cure completely for overcoating, recommended leaving 1 hour. Full cure time may vary based on environmental conditions.
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* PAGE 23 – Catalyst Ratio */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* Protection & Documentation – cierre de sección anterior */}
  <View style={{ marginTop: 6, marginLeft: 16 }}>
    <Text style={[styles.textBold, { marginBottom: 3 }]}>
      Protection:
    </Text>
    <Text style={styles.text}>
      – Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
    </Text>

    <Text style={[styles.textBold, { marginTop: 6, marginBottom: 3 }]}>
      Documentation:
    </Text>
    <Text style={styles.text}>
      – Take photos before, during and after the application to document the condition of the roof and the work completed.
    </Text>
  </View>

  {/* Catalyst Ratio Section */}
  <View style={{ marginTop: 6 }}>
    <Text style={styles.sectionTitle}>Catalyst Ratio</Text>

    <Text style={[styles.textBold, { marginBottom: 8 }]}>
      Guide to Adjusting Catalyst Ratio for RapidRoof
    </Text>

    <View style={{ marginLeft: 16, marginTop: 4, marginBottom: 14 }}>
      <Text style={styles.text}>
        <Text style={styles.label}>Objective:</Text>{' '}
        Mix RapidRoof with the correct catalyst ratio to ensure optimal curing times and performance.
      </Text>

      <Text style={styles.text}>

<Text style={styles.label}>Safety Precautions:</Text> please see pages 9 - 12.

</Text>

      <Text style={[styles.textBold, { marginTop: 6, marginBottom: 6 }]}>
        Catalyst ratio:
      </Text>

      <Text style={styles.text}>
        • Standard ratio: 20g of catalyst to every 1kg of product (2% catalyst ratio).
      </Text>
      <Text style={styles.text}>
        • Adjustable range: 1% to 4% catalyst ratio, depending on temperature and desired curing time.
      </Text>

      <Text style={[styles.textBold, { marginTop: 6, marginBottom: 3 }]}>
        Calculating catalyst amounts:
      </Text>

      <Text style={styles.text}>
        • Determine the product amount: measure the amount of RapidRoof product you need to mix.
      </Text>

      {/* Tabla 1 – se mantiene el diseño tal cual */}
      <View style={[styles.table, { marginTop: 12 }]}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeaderCell}>Temperature °C</Text>
          <Text style={styles.tableHeaderCell}>Catalyst (%)</Text>
          <Text style={styles.tableHeaderCell}>Drying Times (Min)</Text>
          <Text style={styles.tableHeaderCell}>Cure Time (min)</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>5°C</Text>
          <Text style={styles.tableCell}>4.0</Text>
          <Text style={styles.tableCell}>20</Text>
          <Text style={styles.tableCell}>80</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>10°C</Text>
          <Text style={styles.tableCell}>3.5</Text>
          <Text style={styles.tableCell}>18</Text>
          <Text style={styles.tableCell}>70</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>20°C</Text>
          <Text style={styles.tableCell}>2.0</Text>
          <Text style={styles.tableCell}>15</Text>
          <Text style={styles.tableCell}>60</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>30°C</Text>
          <Text style={styles.tableCell}>1.0</Text>
          <Text style={styles.tableCell}>8</Text>
          <Text style={styles.tableCell}>40</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>35°C</Text>
          <Text style={styles.tableCell}>1.0</Text>
          <Text style={styles.tableCell}>6</Text>
          <Text style={styles.tableCell}>30</Text>
        </View>
      </View>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

  

{/* Página 24 – Catalyst Ratio (2) */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    {/* Tabla 2 – se mantiene el diseño */}
    <View style={[styles.table, { marginTop: 1 }]}>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeaderCell}>Amount of Product</Text>
        <Text style={styles.tableHeaderCell}>Amount of Catalyst based on 2%</Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>1kg</Text>
        <Text style={styles.tableCell}>20g</Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>3kg</Text>
        <Text style={styles.tableCell}>60g</Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>5kg</Text>
        <Text style={styles.tableCell}>100g</Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>7.5kg</Text>
        <Text style={styles.tableCell}>150g</Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>10kg</Text>
        <Text style={styles.tableCell}>200g</Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>15kg</Text>
        <Text style={styles.tableCell}>300g</Text>
      </View>
    </View>

    <View style={{ marginTop: 14 }}>

      <View style={{ marginLeft: 16, marginBottom: 8, marginTop: 8 }}>
        {/* Mixing Steps */}
        <Text style={[styles.textBold, { marginBottom: 6 }]}>
          Mixing steps:
        </Text>

        <Text style={styles.text}>
          • Measure the product when mixing smaller quantities: weigh the required amount of RapidRoof product using a scale. Otherwise, as a general rule, use all catalyst supplied with the accompanied liquid part.
        </Text>

        <Text style={[styles.text, { marginTop: 6 }]}>
          • Measure the catalyst: weigh the appropriate amount of catalyst based on the chosen ratio.
        </Text>

        <Text style={[styles.text, { marginTop: 6 }]}>
          • Mix the product and catalyst:
        </Text>
        <Text style={styles.text}>
          – Pour the RapidRoof into a clean mixing container.
        </Text>
        <Text style={styles.text}>
          – Add the catalyst to the product.
        </Text>
        <Text style={styles.text}>
          – Thoroughly mix the product and catalyst using a drill with a mixing attachment or a mixing stick until the mixture is uniform. Minimum time approx. 2 minutes.
        </Text>

      </View>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>


{/* Página 25 -  CATALYST RATIO PART 3*/}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* Notes on Environmental Conditions */}

  <Text style={[styles.text, { marginTop: 14 }]}>
          • Application:
        </Text>
        <Text style={styles.text}>
          – Apply the mixed product promptly as the curing process begins once the catalyst is added. Work in manageable sections to avoid the product curing before application is complete. It is strongly advised to pour the liquid on to the area, rather than working from a tin / bucket.
        </Text>

<Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
  Notes on Environmental Conditions:
</Text>

<Text style={styles.text}>
  • Higher temperatures: use a lower catalyst ratio to slow down the curing process (minimum 1%).
</Text>

<Text style={styles.text}>
  • Lower temperatures: use a higher catalyst ratio to speed up the curing process (maximum 4%).
</Text>

{/* Final Inspection and Documentation */}
<Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
  Final Inspection and Documentation:
</Text>

<Text style={styles.text}>
  • Inspect the mixture:
</Text>
<Text style={styles.text}>
  – Ensure the mixture is uniform with no unmixed catalyst or product.
</Text>

<Text style={[styles.text, { marginTop: 6 }]}>
  • Apply and allow to cure:
</Text>
<Text style={styles.text}>
  – Follow the application steps and allow the product to cure.
</Text>

<Text style={[styles.text, { marginTop: 6 }]}>
  • Document the process:
</Text>
<Text style={styles.text}>
  – Take photos before, during and after the application to document the condition of the roof and the work completed.
</Text>


  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>
  </Page>

{/* Página 26 - Existing Details, Terminations and Upstands (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* TÍTULO PRINCIPAL */}
  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>
      Existing Details, Terminations and Upstands
    </Text>

    <Text style={[styles.text, { marginBottom: 20 }]}>
      Guide to Treating Existing Details, Terminations, and Upstands on a Roof at a 150mm Minimum Height
    </Text>

    {/* OBJECTIVE */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Objective:
    </Text>

    <Text style={[styles.text, { marginBottom: 20 }]}>
      Ensure all existing details, terminations and upstands on the roof are properly treated
      {guarantee === '20-year' || fullyPrimedSurfaces.includes(surface)
        ? ', primed and waterproofed'
        : ' and waterproofed'} to a minimum height of 150mm using RapidRoof products.
    </Text>

    {/* DEFINITIONS */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Definitions:
    </Text>

    <Text style={styles.text}>
      • <Text style={styles.textBold}>Details:</Text> specific areas on a roof where different materials or surfaces meet, such as around vents, skylights and chimneys.
    </Text>

    <Text style={styles.text}>
      • <Text style={styles.textBold}>Terminations:</Text> points where roofing materials end or transition, such as edges, eaves and parapet walls.
    </Text>

    <Text style={[styles.text, { marginBottom: 20 }]}>
      • <Text style={styles.textBold}>Upstands:</Text> vertical or inclined surfaces that rise from the main roof surface, such as walls, curbs and penetrations.
    </Text>

    {/* LAS 3 LÍNEAS QUE DEBEN IR COMPLETAS EN UNA SOLA LÍNEA */}
    <Text style={styles.text}>

<Text style={styles.label}>Safety Precautions:</Text> please see pages 9 - 12.

</Text>

    <Text
      wrap={false}
      style={[styles.textBold, { marginBottom: 6 }]}
    >
      Preparation Steps: Please see page 15.
    </Text>

    <Text
  wrap={false}
  style={[styles.textBold, { marginBottom: 6 }]}
>
  Application Steps: Please see page{' '}
  {(guarantee === '20-year' || fullyPrimedSurfaces.includes(surface))
    ? '30'
    : '28'}
  .
</Text>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>


{/* Página 27 - Guide to Waterproofing into a Chase */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>
      Guide to Waterproofing into a Chase
    </Text>

    <View style={{ marginLeft: 16, marginBottom: 24, marginTop: 8 }}>
      {/* Objective */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Objective:
      </Text>
      <Text style={styles.text}>
        Properly waterproof into a chase to ensure a watertight seal and prevent water ingress at junctions between roof surfaces and walls or other vertical structures.
      </Text>

      {/* Safety precautions dinámico */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Safety precautions:
      </Text>
      <Text style={styles.text}>
        Please see pages 9 - 12.
      </Text>

      {/* Preparation Steps */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Preparation steps:
      </Text>

      <Text style={styles.text}>
        • Determine the location of the chase: identify the area where the chase needs to be cut. Typically, this will be where the roof meets a vertical structure, such as a wall.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Cut the chase: use an angle grinder with a diamond blade or a masonry chisel to cut a horizontal chase into the wall
        {guarantee === '10-year'
          ? ' at the height of 150mm. The depth and width of the chase should be sufficient to embed the waterproofing membrane securely (usually about 20-25mm deep and wide).'
          : '. The depth and width of the chase should be sufficient to embed the RapidRoof waterproofing securely (usually about 20-25mm deep and wide).'}
      </Text>

      <Text style={styles.text}>
        • Ensure the chase is level and continuous along the length where waterproofing is required.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Clean the chase: remove all dust and debris from the chase using a brush and vacuum. The chase should be clean and dry before applying any {guarantee === '10-year' ? 'waterproofing materials.' : 'RapidRoof materials.'}
      </Text>

      {/* Application Steps */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Application steps:
      </Text>

      {/* Primer */}
{(guarantee === '20-year' || fullyPrimedSurfaces.includes(surface)) && (
  <Text style={styles.text}>
    • Apply RapidRoof Primer: please see page 28.
  </Text>
)}

{/* BaseCoat / TopCoat */}
{(guarantee === '20-year' || fullyPrimedSurfaces.includes(surface)) ? (
  <Text style={[styles.text, { marginTop: 6 }]}>
    • Apply RapidRoof Waterproof as a basecoat and reinforcement matting: please see page 30.
  </Text>
) : (
  <Text style={[styles.text, { marginTop: 6 }]}>
    • Apply RapidRoof Waterproof as a basecoat & topcoat: please see page 28.
  </Text>
)}

    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* Página 28 – Guide to Waterproofing into a Chase (Parte 2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14, marginLeft: 16, marginBottom: 24 }}>
    {/* Seal the Chase */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Seal the chase:
    </Text>

    {guarantee === '20-year' ? (
      <>
        <Text style={styles.text}>
          • Option 1 – Apply sealant: once the RapidRoof waterproofing layers are dry, apply LRS PU Mastic into the chase. This will provide an additional seal and help secure the membrane in place.
        </Text>

        <Text style={[styles.text, { marginTop: 6 }]}>
          • Option 2 – Mortar mix: mix a suitable mortar or cementitious repair product and fill the chase, pressing it firmly to embed the membrane and sealant securely. Smooth the surface for a neat finish.
        </Text>
      </>
    ) : (
      <Text style={styles.text}>
        • Apply sealant: once the RapidRoof waterproofing layers are dry, apply LRS PU Mastic into the chase. This will provide an additional seal and help secure and terminate the waterproofing.
      </Text>
    )}

    {/* Final inspection and protection */}
    <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
      Final inspection and protection:
    </Text>

    <Text style={styles.text}>
      • Inspect and smooth:
    </Text>

    <Text style={styles.text}>
      – Inspect the waterproofed area for any bubbles, wrinkles or uncovered sections. Smooth out any imperfections and ensure {guarantee === '10-year' ? 'the membrane is securely waterproofed in the chase.' : 'the RapidRoof is securely embedded in the chase.'}
    </Text>

    <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
      Allow to cure:
    </Text>
    <Text style={styles.text}>
      – Allow all applied materials to cure completely according to {guarantee === '10-year' ? 'this specification.' : 'the manufacturer’s instructions.'}
    </Text>

    {guarantee === '20-year' && (
      <>
        <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
          Protection:
        </Text>

        <Text style={styles.text}>
          – Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
        </Text>
      </>
    )}

    <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
      Documentation:
    </Text>

    <Text style={styles.text}>
      – Take photos before, during and after the application to document the condition of the roof and the work completed.
    </Text>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>



{(guarantee === '20-year' || (guarantee === '10-year' && fullyPrimedSurfaces.includes(surface))) && (
  <>
    {/* Página 29 GUIDE APLY PRIMER */}
    <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

      {/* TÍTULO PRINCIPAL */}
<Text style={styles.sectionTitle}>
  Guide to Applying RapidRoof Primer on {surface}
</Text>

{guarantee === '10-year' && fullyPrimedSurfaces.includes(surface) && (
  <Text style={[styles.text, { marginBottom: 10 }]}>
    The roof surface should be fully primed using RapidRoof Primer.
  </Text>
)}

{/* OBJECTIVE */}
<Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
<Text style={[styles.text, { marginBottom: 20 }]}>
  Apply RapidRoof Primer at a coverage rate of 0.3kg per m² to ensure proper adhesion and performance of subsequent RapidRoof layers.
</Text>

<Text style={styles.text}>

<Text style={styles.label}>Safety Precautions:</Text> please see pages 9 - 12.

</Text>

{/* PREPARATION STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>

<Text style={styles.listItem}>• Clean the Roof:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Please see page 15.
</Text>

<Text style={styles.listItem}>• Inspect the Roof:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  – Check for any remaining cracks, splits, or damages that need repair.
Ensure all repairs are completed and fully cured before applying the
RapidRoof Primer.
</Text>

   {/* APPLICATION OF PRIMER */}
   <Text style={[styles.label, { marginBottom: 6 }]}>Application of RapidRoof Primer:</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Measure the Area</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Measure the total roof area to calculate the required amount of RapidRoof Primer. At a coverage rate of 0.3kg per m², ensure you have enough product to fully cover the surface.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Mix RapidRoof Primer</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Thoroughly mix the RapidRoof Primer with the Primer Catalyst. Use a mixing stick or a drill with a mixing attachment until the consistency is even and well blended.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Apply Primer</Text></Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Use a short pile roller or brush to apply the RapidRoof Primer at a coverage rate of 0.3kg per m².
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Work in manageable sections to ensure even distribution and prevent the product from drying out before being properly spread.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Ensure Even Coverage</Text></Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Apply the primer uniformly across all surfaces. Avoid gaps, thin areas, or missed sections.
</Text>

      <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

    </Page>

    {/* Página 30, primer part 2 */}
    <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

      <Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Feather the edges to create smooth transitions with adjacent surfaces or existing layers.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Inspect and Smooth</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  – Use the roller or brush to eliminate bubbles and imperfections. Ensure the surface is even, smooth, and completely covered.
</Text>

{/* DRYING AND FINAL INSPECTION */}
<Text style={[styles.label, { marginBottom: 6 }]}>Drying and Curing:</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Allow to Dry</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Let the RapidRoof Primer dry completely. Typical drying time is around 20 minutes, depending on environmental conditions.
</Text>

  <Text style={styles.listItem}>• <Text style={styles.label}>Final Inspection</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  – Perform a final inspection to confirm that all surfaces are fully coated, with no visible bubbles or unprimed areas.
</Text>

{/* FINAL STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Final Steps:</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Protection</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Cover any nearby landscaping or structures with tarpaulin to prevent accidental splashes or contamination during the primer application.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Documentation</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  – Take clear photos before, during, and after the primer application to document the condition of the roof and the work carried out.
</Text>


<Text style={[styles.label, { marginBottom: 6 }]}>Storage </Text>

<Text style={styles.listItem}>• <Text style={styles.label}> LRS RapidRoof Primer must be stored between 5°c and 20°c at all times
and kept out of direct sunlight.</Text></Text>

<Text style={[styles.label, { marginBottom: 6 }]}>Application Temperatures </Text>

<Text style={styles.listItem}>• <Text style={styles.label}> Check the substrate temperatures prior to application. Minimum surface
temperature + 0°c and max surface temperature is 35°c.</Text></Text>

      <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

    </Page>
  </>
)}


{/* Página 31 - RapidRoof BaseCoat (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

{/* TÍTULO PRINCIPAL */}
<Text style={styles.sectionTitle}>RapidRoof BaseCoat</Text>

{/* SUBTÍTULO */}
<Text style={[styles.text, { marginBottom: 10 }]}>
  {guarantee === '20-year'
    ? 'Guide to Applying RapidRoof BaseCoat with Reinforcement Matting'
    : fullyPrimedSurfaces.includes(surface)
      ? 'Guide to Applying RapidRoof BaseCoat to All Areas'
      : 'Guide to Applying RapidRoof BaseCoat'}
</Text>

  {/* Objective */}
  <Text style={[styles.text, { marginBottom: 6 }]}>
        {guarantee === '20-year'
          ? 'Objective: Fully Reinforced RapidRoof Waterproof at a coverage rate of 1.25kg per m² to ensure a durable and waterproof roof surface.'
          : 'Objective: RapidRoof Waterproof at a coverage rate of 1kg per m² to ensure a durable and waterproof roof surface.'}
      </Text>

      {/* Safety Precautions */}
      <Text style={styles.text}>

<Text style={styles.label}>Safety Precautions:</Text> please see pages 9 - 12.

</Text>

      {/* Preparation Steps */}
      <Text style={[styles.label, { marginBottom: 4 }]}>Preparation Steps:</Text>

      {guarantee === '20-year' ? (
        <>
          <Text style={styles.listItem}> Clean the Roof:</Text>
          <Text style={[styles.text, { marginLeft: 16 }]}>
          • Please see page 15
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.listItem}> Clean the Roof:</Text>
          <Text style={[styles.text, { marginLeft: 16 }]}>
          • Please see page 15.
          </Text>
        </>
      )}

      <Text style={[styles.listItem, { marginTop: 4 }]}> Inspect the Roof:</Text>
      <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
      • Check for any remaining cracks, splits, or damage that need repair. Ensure all repairs are completed and fully cured before application.
      </Text>

      <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>
      Application of RapidRoof Waterproof
      {guarantee === '20-year' ? ' with Reinforcement Matting' : ''}
    </Text>

    {/* PRIMER ÍTEM (diferente entre 10 y 20 años) */}
    {guarantee === '20-year' ? (
      <>
        <Text style={styles.listItem}> Measure and Cut Matting:</Text>
        <Text style={[styles.text, { marginLeft: 16 }]}>
        • Measure the area of the roof and cut RapidRoof Reinforcement Matting to fit, allowing for overlaps typically 50mm.
        </Text>
      </>
    ) : (
      <>
        <Text style={styles.listItem}> Measure Area or Grid Out Tins:</Text>
        <Text style={[styles.text, { marginLeft: 16 }]}>
        • Measure the area of the roof and ensure the RapidRoof Waterproof is applied to the correct coverage rate.
        </Text>
      </>
    )}

    {/* Mix RapidRoof Waterproof (solo cambia un pequeño texto) */}
    <Text style={[styles.listItem, { marginTop: 6 }]}> Mix RapidRoof Waterproof:</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      {guarantee === '20-year'
        ? '• Mix RapidRoof Waterproof and RapidRoof Waterproof Catalyst. Use a drill with a mixing attachment or a mixing stick for even consistency.'
        : '• Mix the RapidRoof Waterproof and RapidRoof Waterproof Catalyst. Use a drill with a mixing attachment or mixing stick for even consistency.'}
    </Text>

    {/* Apply RapidRoof Waterproof (texto diferente) */}
    <Text style={[styles.listItem, { marginTop: 6 }]}> Apply RapidRoof Waterproof:</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      {guarantee === '20-year'
        ? '• Using a short pile roller and brush, apply a layer of RapidRoof Waterproof at a coverage rate of 1.25kg per m². Work in manageable sections to ensure the RapidRoof Waterproof does not dry before laying the RapidRoof Reinforcement Matting.'
        : '• Using a short pile roller or brush, apply a layer of RapidRoof Waterproof at a coverage rate of 1kg per m². Work in manageable sections to ensure the Waterproof does not dry before the mixed product is applied.'}
    </Text>
  </View>


  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 32 - RapidRoof BaseCoat (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {guarantee === '20-year' ? (
      <>
        {/* Lay RapidRoof Reinforcement Matting – SOLO 20 AÑOS */}
        <Text style={styles.listItem}> Lay RapidRoof Reinforcement Matting:</Text>
        <Text style={[styles.text, { marginLeft: 16 }]}>
        • Immediately lay RapidRoof Reinforcement Matting onto the wet RapidRoof Waterproof. Press the RapidRoof Reinforcement Matting into the RapidRoof Waterproof to eliminate air pockets and wrinkles. Use a short pile roller to ensure the RapidRoof reinforcement Matting is fully embedded and saturated.
        </Text>
        <Text style={[styles.text, { marginLeft: 16 }]}>
        • Feather the edges to blend the reinforced area with the surrounding roof surface.
        </Text>

        {/* Smooth and Inspect – versión 20 años */}
        <Text style={[styles.listItem, { marginTop: 6 }]}> Smooth and Inspect:</Text>
        <Text style={[styles.text, { marginLeft: 16 }]}>
        • Use the short pile roller or brush to smooth out any bubbles or imperfections. Ensure the matting is fully embedded and the surface is even.
        </Text>
      </>
    ) : (
      <>
        {/* Smooth and Inspect – versión 10 años */}
        <Text style={styles.listItem}> Smooth and Inspect:</Text>
        <Text style={[styles.text, { marginLeft: 16 }]}>
        • Use a short pile roller or brush to smooth out any bubbles or imperfections.
        </Text>
      </>
    )}

  <View style={{ marginLeft: 16, marginBottom: 24 }}>
      {/* Drying and Curing */}
      <Text style={[styles.label, { marginBottom: 6 }]}>Drying and Curing:</Text>

      <Text style={styles.listItem}> Allow to Dry:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        {guarantee === '20-year'
          ? 'The drying time will depend on weather conditions, typically 1 hour before over coating.'
          : 'The drying time will depend on weather conditions, typically 1 hour before over coating.'}
      </Text>

      <Text style={[styles.listItem, { marginTop: 6 }]}> Final Inspection:</Text>
      <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
        {guarantee === '20-year'
          ? '• Perform a final inspection of the applied BaseCoat and matting. Ensure there are no visible bubbles, wrinkles, pinholes or uncoated areas.'
          : '• Perform a final inspection of the applied RapidRoof Waterproof. Ensure there are no visible bubbles, wrinkles, pinholes or uncoated areas.'}
      </Text>

      {/* Final Steps */}
      <Text style={[styles.label, { marginBottom: 6 }]}>Final Steps</Text>

      {guarantee === '20-year' && (
        <>
          <Text style={styles.listItem}> Protection:</Text>
          <Text style={[styles.text, { marginLeft: 16 }]}>
          • Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
          </Text>
        </>
      )}

      <Text style={[styles.listItem, { marginTop: guarantee === '20-year' ? 6 : 0 }]}>
         Documentation:
      </Text>
      <Text style={[styles.text, { marginLeft: 16, marginBottom: 6 }]}>
      • Take photos before, during, and after the application to document the condition of the roof and the work completed.
      </Text>

      {/* Storage / Storage Temperatures */}
      <Text style={[styles.label, { marginBottom: 6 }]}>
        {guarantee === '20-year' ? 'Storage Temperatures:' : 'Storage'}
      </Text>

      {guarantee === '20-year' ? (
        <Text style={[styles.text, { marginBottom: 6 }]}>
          All RapidRoof product should be stored inside between 5°c and 20°c at all times and kept
          out of direct sunlight.
        </Text>
      ) : (
        <Text style={[styles.text, { marginBottom: 6 }]}>
           LRS RapidRoof Waterproof must be stored between 5°c and 20°c at all times and kept out
          of direct sunlight.
        </Text>
      )}

      {/* Application Temperatures */}
      <Text style={[styles.label, { marginBottom: 6 }]}>Application Temperatures:</Text>

      {guarantee === '20-year' ? (
        <Text style={styles.text}>
          Check the surface temperature prior to application. Minimum 0°c and max 35°c.
        </Text>
      ) : (
        <Text style={styles.text}>
           Check the substrate temperatures prior to application. Minimum + 0°c
          and max 35°c.
        </Text>
      )}
    </View>

  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>


{/* Página 33 – RapidRoof Waterproof as a BaseCoat – Inspect */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>
      RapidRoof Waterproof as a BaseCoat - Inspect
    </Text>

    <View style={{ marginLeft: 16, marginBottom: 24, marginTop: 8 }}>
      {/* Steps for checking */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Steps for checking RapidRoof Waterproof:
      </Text>

      {/* VERIFY COVERAGE RATES */}
      <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
        Verify coverage rates:
      </Text>

      {/* Required Rate */}
      <Text style={styles.text}>
        • Required rate: RapidRoof Waterproof should be applied at a coverage rate of{' '}
        {guarantee === '20-year' ? '1.25kg per m².' : '1kg per m².'}
      </Text>

      {/* Calculate Area */}
      <Text style={[styles.text, { marginTop: 6 }]}>
        • Calculate area: measure the total area of the roof section that has been coated.
      </Text>

      {/* Check Usage (dynamic example) */}
      <Text style={[styles.text, { marginTop: 6, marginBottom: 10 }]}>
        • Check usage: compare the amount of RapidRoof Waterproof used to the calculated area
        to ensure it aligns with the recommended coverage rate.{' '}
        {guarantee === '20-year'
          ? 'For example, if you coated 20m², you should have used approximately 25kg of RapidRoof Waterproof (20m² x 1.25kg/m²).'
          : 'For example, if you coated 20m², you should have used approximately 20kg of BaseCoat (20m² x 1kg/m²); this does not include any wastage.'}
      </Text>

      {/* INSPECT FOR PINHOLES */}
      <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
        Inspect for pinholes:
      </Text>

      <Text style={styles.text}>
        • Visual inspection: perform a thorough visual inspection of the coated surface. Look for
        small holes or gaps in the coating, known as pinholes.
      </Text>

      <Text style={[styles.text, { marginTop: 6, marginBottom: 10 }]}>
        • Lighting: use a flashlight to shine light across the surface at a low angle. Pinholes will
        cast small shadows or show up as bright spots.
      </Text>

      {/* ENSURE COMPLETE COVERAGE */}
      <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
        Ensure complete coverage:
      </Text>

      <Text style={styles.text}>
        • Uniform thickness: ensure the coating is uniform in thickness across the entire roof.
        There should be no thin spots or exposed substrate.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Edges and corners: pay attention to edges, corners and transitions, as these areas are
        more prone to insufficient coverage.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Overlaps: check overlaps where different sections meet to ensure they are seamless and
        properly bonded.
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>


{/* Página 34 – Addressing Deficiencies / Final Inspection / Documentation */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14, marginLeft: 16, marginBottom: 24 }}>
    {/* ADDRESSING DEFICIENCIES */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Addressing deficiencies:
    </Text>

    <Text style={styles.text}>
      • Pinholes: if pinholes are found, mark them with chalk or tape. Prepare a small amount of RapidRoof Pro Detailer and use a brush to fill in the pinholes.
    </Text>

    <Text style={[styles.text, { marginTop: 6 }]}>
      • Thin areas: if you find areas with insufficient coverage, apply an additional layer of RapidRoof Waterproof to achieve the recommended thickness.
    </Text>

    <Text style={[styles.text, { marginTop: 6, marginBottom: 16 }]}>
      • Uniformity: use a short pile roller or brush to smooth out any uneven areas and ensure a uniform coating.
    </Text>

    {/* FINAL INSPECTION */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Final inspection:
    </Text>

    <Text style={styles.text}>
      • Curing check: allow RapidRoof Waterproof to dry, typically {guarantee === '20-year' ? '20 minutes.' : '1 hour.'} Once cured, perform a final inspection to ensure all touch-ups and additional layers have properly adhered.
    </Text>

    <Text style={[styles.text, { marginTop: 6, marginBottom: 16 }]}>
      • Complete coating: verify that the entire roof surface is fully coated and protected. There should be no visible substrate or inconsistencies in the coating.
    </Text>

    {/* DOCUMENTATION */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Documentation:
    </Text>

    <Text style={styles.text}>
      • Photos: take photos of the roof before, during and after the application to document the condition and coverage of the RapidRoof Waterproof.
    </Text>

    <Text style={[styles.text, { marginTop: 6 }]}>
      • Notes: keep detailed notes on the amount of product used, the area covered and any issues encountered during the application and inspection process.
    </Text>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* Página 35 – RapidRoof Waterproof as a TopCoat */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>
      RapidRoof Waterproof as a TopCoat
    </Text>

    {/* Solo 10 años tiene esta línea adicional de guía */}
    {guarantee !== '20-year' && (
      <Text style={[styles.textBold, { marginTop: 8, marginBottom: 6, marginLeft: 16 }]}>
        Guide to applying RapidRoof Waterproof:
      </Text>
    )}

    <View style={{ marginLeft: 16, marginBottom: 24, marginTop: guarantee === '20-year' ? 8 : 0 }}>
      {/* Objective */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Objective:
      </Text>
      <Text style={styles.text}>
        {guarantee === '20-year'
          ? 'Apply RapidRoof Waterproof at a coverage rate of 0.75kg per m² to ensure a durable and waterproof roof surface.'
          : 'Apply RapidRoof Waterproof at a coverage rate of 0.5kg per m² to ensure a durable and waterproof roof surface.'}
      </Text>

      {/* Safety Precautions */}
      <Text style={styles.text}>

<Text style={styles.label}>Safety Precautions:</Text> please see pages 9 - 12.

</Text>

      {/* Preparation Steps */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Preparation steps:
      </Text>

      {/* Clean the Roof */}
      <Text style={styles.text}>
        • Clean the roof: {guarantee === '20-year' ? 'please see page 15.' : 'please see page 15.'}
      </Text>

      {/* Inspect the Roof */}
      <Text style={[styles.text, { marginTop: 6 }]}>
        • Inspect the roof: {guarantee === '20-year'
          ? 'check for pinholes, wicks and ensure termination points are fully bonded. Ensure all repairs are completed and fully cured before application.'
          : 'check for any remaining cracks, splits or damage that need repair. Ensure all repairs are completed and fully cured before application.'}
      </Text>

      {/* Application heading */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        {guarantee === '20-year'
          ? 'Application of RapidRoof TopCoat:'
          : 'Application of RapidRoof Waterproof as a TopCoat:'}
      </Text>

      {/* Measure the Area */}
      <Text style={styles.text}>
        • Measure the area: {guarantee === '20-year'
          ? 'measure the area of the roof to calculate the amount of RapidRoof Waterproof required. At a coverage rate of 0.75kg per m², ensure you have sufficient product to cover the entire roof.'
          : 'measure the area of the roof to calculate the amount of RapidRoof Waterproof required. At a coverage rate of 0.5kg per m², ensure you have sufficient product to cover the entire roof.'}
      </Text>

      {/* Mix section */}
      <Text style={[styles.text, { marginTop: 6 }]}>
        {guarantee === '20-year'
          ? '• Mix RapidRoof TopCoat: mix RapidRoof Waterproof with the RapidRoof Waterproof Catalyst. Use a drill with a mixing attachment or a mixing stick to ensure an even consistency.'
          : '• Mix RapidRoof Waterproof: mix the RapidRoof Waterproof with the RapidRoof Waterproof Catalyst. Use a drill with a mixing attachment or a mixing stick to achieve an even consistency.'}
      </Text>

      {/* Apply TopCoat */}
      <Text style={[styles.text, { marginTop: 6 }]}>
        {guarantee === '20-year'
          ? '• Apply TopCoat: using a short pile roller or brush, apply the RapidRoof Waterproof at a coverage rate of 0.75kg per m².'
          : '• Apply RapidRoof Waterproof as a TopCoat: using a short pile roller or brush, apply the RapidRoof Waterproof at a coverage rate of 0.5kg per m².'}
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Work in manageable sections to ensure even coverage and to avoid the product drying out before it is spread properly.
      </Text>

      {/* Ensure Even Coverage */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Ensure even coverage:
      </Text>
      <Text style={styles.text}>
        {guarantee === '20-year'
          ? '• Apply the RapidRoof Waterproof evenly, making sure to cover all areas thoroughly without leaving gaps or thin spots.'
          : '• Apply RapidRoof Waterproof evenly, making sure to cover all areas thoroughly without leaving gaps or thin spots.'}
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* Página 36 – RapidRoof Waterproof as a TopCoat (continued) */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <View style={{ marginLeft: 16, marginBottom: 24 }}>
      {/* Feather the edges – continuación de la aplicación */}
      <Text style={styles.text}>
        • Feather the edges to blend the RapidRoof Waterproof smoothly with any surrounding surfaces or layers.
      </Text>

      {/* Inspect and Smooth */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Inspect and smooth:
      </Text>

      <Text style={styles.text}>
        {guarantee === '20-year'
          ? '• Use the roller or brush to smooth out any bubbles or imperfections. Ensure the surface is even and fully coated.'
          : '• Use the short pile roller or brush to smooth out any bubbles or imperfections. Ensure the surface is even and fully coated.'}
      </Text>

      {/* Drying and Curing */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Drying and curing:
      </Text>

      <Text style={styles.text}>
        • Allow to dry: allow the RapidRoof Waterproof to dry completely. The drying time will depend on weather conditions.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Final inspection: perform a final inspection of the applied RapidRoof Waterproof. Ensure there are no visible bubbles, wrinkles, pinholes or uncoated areas.
      </Text>

      {/* Final Steps */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Final steps:
      </Text>

      <Text style={styles.text}>
        • Documentation: take photos before, during and after the application to document the condition of the roof and the work completed.
      </Text>

      {/* Storage / Storage Temperatures */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        {guarantee === '20-year' ? 'Storage temperatures:' : 'Storage:'}
      </Text>

      <Text style={styles.text}>
        {guarantee === '20-year'
          ? '• All RapidRoof product should be stored inside between 5°C and 20°C at all times and kept out of direct sunlight.'
          : '• LRS RapidRoof Waterproof must be stored between 5°C and 20°C at all times and kept out of direct sunlight.'}
      </Text>

      {/* Application Temperatures */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Application temperatures:
      </Text>

      <Text style={styles.text}>
        {guarantee === '20-year'
          ? '• Check the surface temperature prior to application. Minimum surface temperature 0°C and the maximum surface temperature is 35°C.'
          : '• Check the substrate temperatures prior to application. Minimum surface temperature 0°C and maximum surface temperature is 35°C.'}
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>


{/* Página 37 - RapidRoof Anti-Skid (parte 1/2) */}
{antiSkid === 'Yes' && (
  <>
    <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

      <View style={{ marginTop: 12 }}>
        <Text style={styles.sectionTitle}>
          RapidRoof Anti-Skid
        </Text>

        <Text style={[styles.textBold, { marginBottom: 8 }]}>
          Guide to Applying RapidRoof Anti-Skid Coating
        </Text>

        <View style={{ marginLeft: 16, marginBottom: 12 }}>
          {/* Objective */}
          <Text style={[styles.textBold, { marginBottom: 6 }]}>
            Objective:
          </Text>
          <Text style={styles.text}>
            Apply RapidRoof Anti-Skid coating at a rate of 1kg per m² over the waterproof layer, and back roll the surface to agitate the aggregate, ensuring a durable and effective anti-skid finish.
          </Text>

          {/* Safety Precautions – dinámico */}
          <Text style={styles.text}>

<Text style={styles.label}>Safety Precautions:</Text> please see pages 9 - 12.

</Text>

          {/* Preparation Steps */}
          <Text style={[styles.textBold, { marginTop: 6, marginBottom: 6 }]}>
            Preparation steps:
          </Text>

          {/* Ensure RapidRoof Waterproof is Dry / completely dry */}
          <Text style={styles.text}>
            {guarantee === '20-year'
              ? '• Ensure RapidRoof Waterproof is dry:'
              : '• Ensure RapidRoof Waterproof is completely dry:'}
          </Text>
          <Text style={[styles.text, { marginTop: 4 }]}>
            {guarantee === '20-year'
              ? '– The RapidRoof waterproof layer should be completely dry. Ensure there are no contaminants on the surface.'
              : '– The RapidRoof Waterproof layer should be completely dry. Ensure there are no contaminants on the surface.'}
          </Text>

          {/* Clean the Roof Surface – estructura distinta entre 20 y 10 años */}
          {guarantee === '20-year' ? (
            <>
              <Text style={[styles.text, { marginTop: 6 }]}>
                • Clean the roof surface:
              </Text>
              <Text style={styles.text}>
                – Please see page 15.
              </Text>
            </>
          ) : (
            <Text style={[styles.text, { marginTop: 6 }]}>
              • Clean the roof surface: please see page 15.
            </Text>
          )}

          {/* Application Steps */}
          <Text style={[styles.textBold, { marginTop: 6, marginBottom: 6 }]}>
            Application steps:
          </Text>

          {/* Measure and Prepare */}
          <Text style={styles.text}>
            • Measure and prepare RapidRoof Anti-Skid coating:
          </Text>
          <Text style={[styles.text, { marginTop: 4 }]}>
            – Calculate area: measure the total area to be coated.
          </Text>
          <Text style={styles.text}>
            – Determine amount needed: calculate the amount of RapidRoof Anti-Skid coating required (1kg per m²).
          </Text>

          {/* Mix RapidRoof Anti-Skid Coating – difiere solo la primera palabra */}
          <Text style={[styles.text, { marginTop: 6 }]}>
            • Mix RapidRoof Anti-Skid coating:
          </Text>
          <Text style={styles.text}>
            {guarantee === '20-year'
              ? '– Thoroughly mix the RapidRoof Anti-Skid coating with the RapidRoof Anti-Skid Catalyst. Ensure the aggregate is evenly distributed throughout the coating.'
              : '– Mix the RapidRoof Anti-Skid coating with the RapidRoof Anti-Skid Catalyst. Ensure the aggregate is evenly distributed throughout the coating.'}
          </Text>

          <Text style={[styles.text, { marginTop: 10 }]}>
            • Apply RapidRoof Anti-Skid coating:
          </Text>
          <Text style={styles.text}>
          – Application: apply the RapidRoof Anti-Skid coating at a coverage rate of 1kg per m². Use a
          </Text>

        </View>
      </View>

      <PdfFooter
        guarantee={guarantee}
        pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
      />
    </Page>

{/* Página 38 - RapidRoof Anti-Skid (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <View style={{ marginLeft: 16, marginBottom: 14 }}>

      {/* Apply RapidRoof Anti-Skid Coating */}
      
          <Text style={styles.text}>
             short pile roller or brush to spread the coating evenly over the RapidRoof Waterproof layer.
          </Text>
          <Text style={styles.text}>
            {guarantee === '20-year'
              ? '– Uniform coverage: ensure the coating is applied uniformly without any missed spots or thin areas.'
              : '– Uniform coverage: ensure the RapidRoof Anti-Skid is applied uniformly without any missed spots or thin areas.'}
          </Text>

          {/* Back Roll to Agitate Aggregate – el texto de “Timing” cambia el orden */}
          <Text style={[styles.text, { marginTop: 10 }]}>
            • Back roll to agitate aggregate:
          </Text>
          <Text style={styles.text}>
            {guarantee === '20-year'
              ? '– Timing: before the coating dries, typically between 3–7 minutes, back roll to agitate the aggregate.'
              : '– Timing: before the coating dries, back roll to agitate the aggregate; typically between 3–7 minutes.'}
          </Text>

      {/* Back rolling details */}
      <Text style={styles.text}>
        • Back rolling technique: lightly roll back over the surface in a crosshatch pattern. This agitation will help to evenly distribute the aggregate and create a consistent anti-skid texture.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Consistency: ensure the aggregate is evenly distributed and the texture is consistent across the entire surface.
      </Text>

      {/* Final Steps */}
      <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
        Final steps:
      </Text>

      <Text style={styles.text}>
        • Allow to cure:
      </Text>
      <Text style={styles.text}>
        {guarantee === '20-year'
          ? '– Allow the RapidRoof Anti-Skid coating to completely dry, typically 20 minutes. Curing time may vary based on environmental conditions.'
          : '– Allow the RapidRoof Anti-Skid coating to completely dry, typically 1 hour. Curing time may vary based on environmental conditions.'}
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Inspect the surface:
      </Text>
      <Text style={styles.text}>
        – After curing, inspect the surface to ensure the RapidRoof Anti-Skid texture is uniform and the aggregate is properly embedded in the coating.
      </Text>
      <Text style={styles.text}>
        – Look for any areas that may require touch-up or additional coating.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Clean up:
      </Text>
      <Text style={styles.text}>
        – Clean all tools and equipment immediately after use. Dispose of any waste materials according to local regulations.
      </Text>

      <Text style={[styles.text, { marginTop: 6 }]}>
        • Document the application:
      </Text>
      <Text style={styles.text}>
        – Take photos before, during and after the application to document the condition of the roof and the work completed.
      </Text>
      <Text style={styles.text}>
        – Keep detailed notes on the amount of product used, the area covered and any issues encountered during the application.
      </Text>

    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>


  </>
)}


{/* Página 39 - Completed Roof Surface (dinámica 20 / 10 años) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    {/* Storage / Storage Temperatures */}
    {guarantee === '20-year' ? (
        <>
          <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
            Storage temperatures:
          </Text>
          <Text style={styles.text}>
            • All RapidRoof product should be stored inside between 5°C and 20°C at all times and kept out of direct sunlight.
          </Text>
        </>
      ) : (
        <>
          <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
            Storage:
          </Text>
          <Text style={styles.text}>
            • LRS RapidRoof Anti-Skid must be stored between 5°C and 20°C at all times and kept out of direct sunlight.
          </Text>
        </>
      )}

      {/* Application Temperatures */}
      {guarantee === '20-year' ? (
        <>
          <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
            Application temperatures:
          </Text>
          <Text style={styles.text}>
            • Check the surface temperature prior to application. Minimum surface temperature 0°C and the maximum surface temperature is 35°C.
          </Text>
        </>
      ) : (
        <>
          <Text style={[styles.textBold, { marginTop: 6, marginBottom: 16 }]}>
            Application temperatures:
          </Text>
          <Text style={styles.text}>
            • Check the substrate temperatures prior to application. Minimum surface temperature 0°C and maximum surface temperature is 35°C.
          </Text>
        </>
      )}

    <Text style={styles.sectionTitle}>
      Completed Roof Surface
    </Text>

    <Text style={[styles.textBold, { marginBottom: 8 }]}>
      Guide to Visual Inspection of the Completed Roof Surface
    </Text>

    {/* Objective dinámico */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Objective:
    </Text>
    <Text style={styles.text}>
      {guarantee === '20-year'
        ? 'Conduct a thorough visual inspection of the completed roof surface to ensure there are no pinholes, the coverage is even, details are correctly applied at 150mm and reinforcement matting is properly installed on all details.'
        : 'Conduct a thorough visual inspection of the completed roof surface to ensure there are no pinholes, the coverage is even, details are correctly applied at 150mm and all joints, cracks, splits and changes of substrate are reinforced with Joint Tape.'}
    </Text>

    {/* Safety Precautions dinámico */}
    <Text style={styles.text}>

<Text style={styles.label}>Safety Precautions:</Text> please see pages 9 - 12.

</Text>

    <Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>
      Steps for visual inspection:
    </Text>

    {/* Initial Overview */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Initial overview:
    </Text>
    <Text style={styles.text}>
      Walk around the perimeter of the roof to get an initial overview of the surface.
    </Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Take note of any obvious defects or areas that require closer inspection.
    </Text>

    {/* Check for Pinholes */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Check for pinholes:
    </Text>
    <Text style={styles.text}>
      Visual scan: perform a visual scan of the entire roof surface. Look closely for small holes or gaps in the coating, known as pinholes.
    </Text>
    <Text style={styles.text}>
      Flashlight method: use a flashlight to shine light across the surface at a low angle. Pinholes will cast small shadows or appear as bright spots.
    </Text>

  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>


{/* Página 40 - Completed Roof Surface (dinámica 20 / 10 años) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>

  <Text style={[styles.text, { marginBottom: 8 }]}>
      Detailed areas: pay extra attention to seams, edges and transitions where pinholes are more likely to occur.
    </Text>

    {/* Ensure Even Coverage */}
    <Text style={[styles.textBold, { marginBottom: 6 }]}>
      Ensure even coverage:
    </Text>
    <Text style={styles.text}>
      Uniform thickness: verify that the coating is uniformly thick across the entire roof. There should be no thin spots or exposed substrate.
    </Text>
    <Text style={styles.text}>
      Edges and corners: check edges, corners and transitions to ensure they are fully coated and have no exposed areas.
    </Text>
    <Text style={styles.text}>
      Colour consistency: look for colour consistency across the surface, as variations can indicate uneven application.
    </Text>

    <View style={{ marginLeft: 16, marginBottom: 24 }}>
      {/* Inspect details at 150mm */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Inspect details at 150mm:
      </Text>

      <Text style={styles.text}>
        • Measure height: use a measuring tape to check that details such as terminations, upstands and other critical points are coated to a minimum height of 150mm.
      </Text>
      <Text style={[styles.text, { marginTop: 6, marginBottom: 12 }]}>
        • Detail work: ensure all details are properly sealed and the coating is applied consistently at the required height.
      </Text>

      {/* Bloque dinámico: Reinforcement Matting / Joint Tape */}
      {guarantee === '20-year' ? (
        <>
          <Text style={[styles.textBold, { marginBottom: 6 }]}>
            Verify reinforcement matting:
          </Text>

          <Text style={styles.text}>
            • Visible matting: inspect areas where reinforcement matting was applied. The matting should be fully embedded in the coating with no exposed edges.
          </Text>
          <Text style={[styles.text, { marginTop: 6 }]}>
            • Coverage: ensure the matting extends to cover all critical areas, such as joints, seams and around roof penetrations.
          </Text>
          <Text style={[styles.text, { marginTop: 6, marginBottom: 12 }]}>
            • Bonding: check that the matting is well-bonded to the substrate and there are no air pockets or wrinkles.
          </Text>
        </>
      ) : (
        <>
          <Text style={[styles.textBold, { marginBottom: 6 }]}>
            Verify Joint Tape:
          </Text>

          <Text style={styles.text}>
            • Visible matting: inspect areas where Joint Tape was applied. The Joint Tape should be fully embedded in the coating with no exposed edges.
          </Text>
          <Text style={[styles.text, { marginTop: 6 }]}>
            • Coverage: ensure the Joint Tape extends to cover all critical areas, such as joints, seams and around roof penetrations.
          </Text>
          <Text style={[styles.text, { marginTop: 6, marginBottom: 12 }]}>
            • Bonding: check that the Joint Tape is well-bonded to the substrate and there are no air pockets or wrinkles.
          </Text>
        </>
      )}

      {/* Subtítulo de cierre de sección */}
      <Text style={[styles.textBold, { marginBottom: 12 }]}>
        Guide to visual inspection of the completed roof surface:
      </Text>

    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>

{/* Página 41 – Final checks / Document findings / Addressing issues */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <View style={{ marginLeft: 16, marginBottom: 24 }}>
      {/* Final checks */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Final checks:
      </Text>

      <Text style={styles.text}>
        • Hard-to-reach areas: use an inspection mirror to check hard-to-reach areas and ensure they are properly coated.
      </Text>
      <Text style={[styles.text, { marginTop: 6 }]}>
        • Seams and joints: verify that all seams and joints are fully sealed and there are no gaps or openings.
      </Text>
      <Text style={[styles.text, { marginTop: 6, marginBottom: 12 }]}>
        • Overall condition: assess the overall condition of the roof surface. Ensure it looks uniform and well-maintained.
      </Text>

      {/* Document findings */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Document findings:
      </Text>

      <Text style={styles.text}>
        • Photographic evidence: take photos of the roof surface, especially any areas of concern or interest. Capture before and after images if any touch-up work is required.
      </Text>
      <Text style={[styles.text, { marginTop: 6, marginBottom: 12 }]}>
        • Detailed notes: write detailed notes on your findings, including any defects, areas that need additional work and the overall condition of the roof.
      </Text>

      {/* Addressing Issues */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Addressing issues:
      </Text>

      {/* Pinholes */}
      <Text style={styles.text}>
        • Pinholes: mark any pinholes with chalk or tape. Prepare a small amount of RapidRoof Pro Detailer and use a brush to fill in the pinholes.
      </Text>

      {/* Uneven Coverage */}
      <Text style={[styles.text, { marginTop: 6 }]}>
        • Uneven coverage: apply additional coating to any areas with insufficient coverage to achieve uniform thickness.
      </Text>

      {/* Detail Adjustments */}
      <Text style={[styles.text, { marginTop: 6, marginBottom: 8 }]}>
        • Detail adjustments: correct any issues with details that are not at the required 150mm height. Apply additional coating if necessary.
      </Text>

      {/* Bloque dinámico final: Reinforcement Matting / Joint Tape */}
      {guarantee === '20-year' ? (
        <>
          <Text style={[styles.textBold, { marginBottom: 6 }]}>
            Reinforcement matting:
          </Text>
          <Text style={styles.text}>
            • Ensure any improperly applied matting is corrected by applying additional coating and embedding new matting as needed.
          </Text>
        </>
      ) : (
        <>
          <Text style={[styles.textBold, { marginBottom: 6 }]}>
            Joint Tape:
          </Text>
          <Text style={styles.text}>
            • Ensure any improperly applied Joint Tape is corrected by applying additional coating and embedding new Joint Tape as needed.
          </Text>
        </>
      )}
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
  />
</Page>



{/* Página 42 - Schedule of Products (parte 1/2) */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>


    {/* Schedule of Products */}
    <Text style={styles.sectionTitle}>
      Schedule of Products
    </Text>

    <View style={{ marginLeft: 16, marginTop: 8 }}>
      {/* PRIMER */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        LRS RapidRoof Primer @ 0.3kg per m²:
      </Text>

      <Text style={styles.text}>
        2-part component primer, comprising of a base component A and an activator component B.
      </Text>
      <Text style={styles.text}>
        Colour – clear.
      </Text>
      <Text style={styles.text}>
        Tin sizes – 1.5kg, 3kg and 5kg.
      </Text>

      <Text style={[styles.textBold, { marginTop: 8, marginBottom: 4 }]}>
        Typical coverage rates:
      </Text>
      <Text style={styles.text}>
        • 1.5kg tin – 5m²
      </Text>
      <Text style={styles.text}>
        • 3kg tin – 10m²
      </Text>
      <Text style={[styles.text, { marginBottom: 12 }]}>
        • 5kg tin – 16.6m²
      </Text>

      {/* BASECOAT */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        LRS RapidRoof Waterproof BaseCoat @ {guarantee === '20-year' ? '1.25kg' : '1kg'} per m²:
      </Text>

      <Text style={styles.text}>
        2-part component waterproofing, comprising of a base component A and an activator component B.
      </Text>

        {/* BASECOAT – detalles */}
        <Text style={[styles.textBold, { marginBottom: 6 }]}>
        RapidRoof Waterproof BaseCoat – details:
      </Text>

      <Text style={styles.text}>
        Colour: grey, anthracite and black as standard.
      </Text>
      <Text style={styles.text}>
        Tin sizes: 7.5kg and 15kg.
      </Text>

      <Text style={[styles.textBold, { marginTop: 8, marginBottom: 4 }]}>
        Typical coverage rates:
      </Text>

      {guarantee === '20-year' ? (
        <>
          <Text style={styles.text}>• 5kg tin – 4m²</Text>
          <Text style={styles.text}>• 7.5kg tin – 6m²</Text>
          <Text style={[styles.text, { marginBottom: 12 }]}>
            • 15kg tin – 12m²
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.text}>• 5kg tin – 5m²</Text>
          <Text style={styles.text}>• 7.5kg tin – 7.5m²</Text>
          <Text style={[styles.text, { marginBottom: 12 }]}>
            • 15kg tin – 15m²
          </Text>
        </>
      )}

    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Schedule of products')}
  />
</Page>


{/* Página 43 - Schedule of Products (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <View style={{ marginLeft: 16, marginBottom: 24 }}>


      {/* REINFORCEMENT / JOINT */}
      {guarantee === '20-year' ? (
        <>
          <Text style={[styles.textBold, { marginBottom: 6 }]}>
            Reinforcement matting:
          </Text>
          <Text style={styles.text}>
            Used to fully reinforce the RapidRoof BaseCoat.
          </Text>
          <Text style={styles.text}>
            Colour: white.
          </Text>
          <Text style={styles.text}>
            Grade: 150gsm chop strand matting.
          </Text>
          <Text style={[styles.text, { marginBottom: 12 }]}>
            Roll sizes: 1m x 25m and 1m x 180m.
          </Text>
        </>
      ) : (
        <>
          <Text style={[styles.textBold, { marginBottom: 6 }]}>
            Joint Tape:
          </Text>
          <Text style={styles.text}>
            Used to reinforce joints, cracks, splits or changes of substrates.
          </Text>
          <Text style={styles.text}>
            Colour: white.
          </Text>
          <Text style={styles.text}>
            Grade: 150gsm chop strand matting.
          </Text>
          <Text style={[styles.text, { marginBottom: 12 }]}>
            Roll sizes: 100mm x 25lm and 100mm x 180lm.
          </Text>
        </>
      )}

      {/* TOPCOAT */}
      <Text style={[styles.textBold, { marginTop: 8, marginBottom: 6 }]}>
        LRS RapidRoof Waterproof TopCoat @ {guarantee === '20-year' ? '0.75kg' : '0.5kg'} per m²:
      </Text>

      <Text style={styles.text}>
        2-part component waterproofing, comprising of a base component A and an activator component B.
      </Text>
      <Text style={styles.text}>
        Colour: grey, anthracite and black as standard.
      </Text>
      <Text style={styles.text}>
        Tin sizes: 7.5kg and 15kg.
      </Text>

      <Text style={[styles.textBold, { marginTop: 8, marginBottom: 4 }]}>
        Typical coverage rates:
      </Text>

      {guarantee === '20-year' ? (
        <>
          <Text style={styles.text}>• 5kg tin – 6.6m²</Text>
          <Text style={styles.text}>• 7.5kg tin – 10m²</Text>
          <Text style={styles.text}>• 15kg tin – 20m²</Text>
        </>
      ) : (
        <>
          <Text style={styles.text}>• 5kg tin – 10m²</Text>
          <Text style={styles.text}>• 7.5kg tin – 15m²</Text>
          <Text style={styles.text}>• 15kg tin – 30m²</Text>
        </>
      )}

<View style={{ marginLeft: 16, marginBottom: 24 }}>
      {/* ANTI-SKID */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        LRS RapidRoof Anti-Skid @ 1kg per m²:
      </Text>

      <Text style={styles.text}>
        2-part component, comprising of a base component A and an activator component B.
      </Text>
      <Text style={styles.text}>
        Colour: grey and black as standard.
      </Text>
      <Text style={styles.text}>
        Tin sizes: 5kg and 10kg.
      </Text>

      <Text style={[styles.textBold, { marginTop: 8, marginBottom: 4 }]}>
        Typical coverage rates:
      </Text>
      <Text style={styles.text}>
        • 5kg tin – 5m²
      </Text>
      <Text style={[styles.text, { marginBottom: 8 }]}>
        • 10kg tin – 10m²
      </Text>

      <Text style={styles.text}>
        Most colours available to order as specials. Please call 01948 841 877 for further details.
      </Text>
    </View>

    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('Schedule of products') + 1}
  />
</Page>


{/* Página 44 - General Guidance and Requirements (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
   
    <Text style={styles.sectionTitle}>
      General Guidance and Requirements
    </Text>

    <View style={{ marginLeft: 16, marginTop: 8, marginBottom: 24 }}>
      {/* Drying Out – Equipment */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Drying out - equipment:
      </Text>
      <Text style={styles.text}>
        These are readily available commercially from local tool plant hire companies.
      </Text>
      <Text style={[styles.text, { marginTop: 4 }]}>
        • Leaf blowers
      </Text>
      <Text style={styles.text}>
        • Hot air blower
      </Text>
      <Text style={[styles.text, { marginBottom: 12 }]}>
        • Roof pumps
      </Text>

      {/* Defects */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Defects:
      </Text>
      <Text style={[styles.text, { marginBottom: 12 }]}>
        This specification provided by LRS is written on the basis that the substrate, roof
        deck and structures are sound and suitable. We cannot accept responsibility for
        the consequences of defects in the roof deck or structure.
      </Text>

      {/* Installation */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Installation:
      </Text>
      <Text style={[styles.text, { marginBottom: 12 }]}>
        All LRS waterproofing systems are to be installed in accordance with this
        specification.
      </Text>

      {/* Building Works */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Building works:
      </Text>
      <Text style={styles.text}>
        It is the contractor’s responsibility to ensure suitable protection of semi-completed
        or completed works.
      </Text>

       {/* Protection of works */}
       <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Protection of works:
      </Text>
      <Text style={[styles.text, { marginBottom: 12 }]}>
        It is the contractor’s responsibility to ensure all plant, equipment or materials
        being stored or placed onto the waterproofing membrane are sufficiently protected
        should any other trades require access across the applied waterproofing membrane
        during or after completion of works.
      </Text>

      {/* Safe working */}
      <Text style={[styles.textBold, { marginBottom: 6 }]}>
        Safe working:
      </Text>
      <Text style={styles.text}>
        All works are to be carried out in accordance with the current Health and Safety
        legislation.
      </Text>
      <Text style={[styles.text, { marginBottom: 12 }]}>
        Available at https://www.hse.gov.uk/legislation/index.htm
      </Text>

    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('General guidance and requirements')}
  />
</Page>


{/* Página 45 - General Guidance and Requirements (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <View style={{ marginLeft: 16, marginBottom: 14 }}>

      {/* Inclement weather */}
      <Text style={[styles.textBold, { marginTop: 8, marginBottom: 6 }]}>
        Inclement weather protection:
      </Text>
      <Text style={styles.text}>
        If rain is forecast, no LRS waterproofing coatings should be installed. The contractor
        must ensure that, at the end of each day, any exposed membranes or substrates that are
        susceptible to damage through water ingress are sealed and protected to ensure
        complete watertightness.
      </Text>

      {/* Maintenance after installation */}
      <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
        Maintenance after installation:
      </Text>
      <Text style={styles.text}>
        The new roof coverings should be managed in accordance with the recommendations of
        BS6229:2003 with regards to ongoing maintenance.
      </Text>
      <Text style={[styles.text, { marginTop: 4 }]}>
        They should be routinely inspected and cleared of any debris every spring and autumn.
        This will need to be undertaken more often if the roof is surrounded by trees etc.
        Please note that failure to follow maintenance guidelines can invalidate the product
        guarantee.
      </Text>

      {/* Delays */}
      <Text style={[styles.textBold, { marginTop: 12, marginBottom: 6 }]}>
        Delays:
      </Text>
      <Text style={styles.text}>
        All or general areas: ensure the surface is clean and dry before overcoating with
        additional RapidRoof.
      </Text>
    </View>
  </View>

  <PdfFooter
    guarantee={guarantee}
    pageNumber={getPageNumber('General guidance and requirements') + 1}
  />
</Page>



{/* Página 46 - Photographic Evidence */}
{photos?.length > 0 && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <Text style={styles.sectionTitle}>Photographs</Text>


    <View style={{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    }}>
      {photos.slice(0, 4).map((src, idx) => (
        <View
          key={idx}
          style={{
            width: '48%',
            height: 250,
            marginBottom: 12,
            border: '1pt solid #ccc',
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

    <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Photographs')} />
  </Page>
)}

{/* Página 47 - Guarantee */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 14 }}>
    <Text style={styles.sectionTitle}>Materials</Text>

    <Text style={[styles.text, { marginBottom: 10 }]}>
      TBC
    </Text>

    <Text style={[styles.text, { marginBottom: 10 }]}>
      We recommend adding 10% to all materials for wastage in tins and rollers.
    </Text>

    <Text style={styles.text}>
      Please note that it is recommended that these quantities are subject to a full
      site survey/measurement prior to the placement of any orders.
    </Text>
  </View>

  <View style={{ marginTop: 40 }}>
  <Text style={styles.sectionTitle}>Guarantee</Text>

  <Text style={[styles.text, { marginBottom: 12 }]}>
  Materials only. The following guaranteed specification is covered by LRS product
  guarantee for the period of {guarantee === "25-year" ? "25-years" : guarantee === "20-year" ? "20-years" : "10-years"} from the date of practical completion.
</Text>


  <Text style={[styles.text, { marginBottom: 12 }]}>
    Please Note: Only products supplied by LRS will be covered in this guarantee.
    We are unable to guarantee patches or repairs.
  </Text>

  <Text style={[styles.textBold, { marginTop: 24 }]}>Regards</Text>

  {/* Firma centrada */}
  <Image
    src="/firma.png" // Usa la firma que subiste
    style={{ width: 100, height: 40, marginVertical: 8 }}
  />

  <Text style={styles.textBold}>Paul Jones</Text>
  <Text style={styles.textBold}>Technical Manager</Text>

  <Text style={[styles.text, { marginTop: 4 }]}>T: 01948 841 877</Text>
  <Text style={[styles.text, { color: '#007bce', textDecoration: 'underline' }]}>
    E: paul.jones@lrs-systems.co.uk
  </Text>
</View>


  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Materials and Guarantee')} />
</Page>


{/* Página final - estilo profesional como la imagen 2 */}

<Page size="A4" style={{ padding: 0, margin: 0 }}>
  {/* Imagen superior */}
  <Image src="/last.png" style={{ width: '100%' }} />

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

export default PdfDocument;
