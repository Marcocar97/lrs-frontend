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
});



  
const getGuaranteeText = (guarantee) => {
    return guarantee === '20-year'
      ? 'RapidRoof Pro 20 Specification'
      : 'RapidRoof 10 Specification';
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
              src="https://i.postimg.cc/WhWy9YdP/lrs-1.png"
              style={{ width: 160 }}
            />
            <Image
              src={
                guarantee === '20-year'
                  ? 'https://i.postimg.cc/SnnvHL9Y/20y-1.png'
                  : 'https://i.postimg.cc/yD2bKJhQ/10y-1.png'
              }
              style={{ width: 160 }}
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
      let count = 29;
      const includesPrimer = guarantee === '20-year' || (guarantee === '10-year' && isFullyPrimed);
      if (!includesPrimer) count -= 3;
      if (antiSkid !== 'Yes') count -= 3;
      return count;
    };
    
    const waterproofPageCount = getWaterproofPagesCount({ guarantee, surface, antiSkid });
    
    const baseSections = [
      { title: 'Project details', pages: 1 },
      { title: 'Preliminaries & general conditions', pages: 1 },
      { title: 'Existing falls, change in scope of works', pages: 1 },
      { title: 'Existing roof condition', pages: 1 },
      { title: 'Natural growth', pages: 1 },
      { title: 'Adhesion test, compliance with building regulations', pages: 1 },
      { title: 'Flat roof detailing guidance & CDM', pages: 1 },
      { title: 'Roof specification', pages: 1 },
      { title: 'The roof build-up and preparation', pages: 2 },
      { title: 'Cleaning, TV, satellite arrays, cables', pages: 3 },
      { title: 'Outlets', pages: 3 },
      { title: 'Multi-Purpose Filler', pages: 3 },
      { title: 'Waterproof coverings', pages: waterproofPageCount },
      { title: 'Schedule of products', pages: 2 },
      { title: 'Additional information', pages: 1 },
      { title: 'General guidance and requirements', pages: 2 },
      { title: 'Safety Advice for Usinf RapidRoof PMMA', pages: 3 },
      { title: 'Photographs', pages: 1 },
      { title: 'Guarantee', pages: 1 },
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
      src={guarantee === '20-year' ? '/20y.png' : '/10y.png'}
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

  <PdfFooter guarantee={guarantee} />
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


  {/* Pie de página */}
  {/* Existing roof condition */}
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Existing roof condition')} />

</Page>



{/* Página 7 - Natural Growth */}

<Page size="A4" style={styles.page}>
<PdfHeader reference={reference} />

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


  {/* Natural growth */}
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Natural growth')} />
</Page>

{/* Página 8 - Adhesion Test */}

<Page size="A4" style={styles.page}>
<PdfHeader reference={reference} />

 {/* Adhesion Test */}
<View style={{ marginTop: 14 }}>
  <Text style={styles.sectionTitle}>Adhesion Test</Text>

  <Text style={styles.label}>Test Areas</Text>

  <View style={{ marginLeft: 16, marginBottom: 20 }}>
    <Text style={styles.text}>• Clean, remove all dust and contamination before performing test patches. Prime using LRS RapidRoof Primer at 0.3kg per m² and allow to dry.</Text>
    <Text style={styles.text}>• The contractor must document and record the identified test areas after applying RapidRoof Pro BaseCoat.</Text>
    <Text style={styles.text}>• RapidRoof BaseCoat applied at 1.25kg per m² and fully reinforced using 150gsm Reinforcement Matting.</Text>
    <Text style={styles.text}>• The BaseCoat must be allowed to fully cure for 24 hours prior to the addition test being undertaken.</Text>
    <Text style={styles.text}>• Should the adhesion test fail the contractor must inform LRS immediately upon their findings so that alternative measures can be agreed before the main works commence.</Text>
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


{/* Página 10 - Roof Specification */}

{image && (
  <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

      <View style={{ marginLeft: 16 }}>
  <Text style={styles.text}>• Operatives should take an active part in helping to manage health and safety risks. Responsibilities include:</Text>
  <Text style={styles.text}>  - Only carrying out construction work if they have the relevant skills, knowledge, training, and experience. Alternatively, operatives need to ensure that they are provided with the training and supervision that enables them to do their works safely and without risk to health.</Text>
</View>

{/* Roof Specification Section */}
<View style={{ marginTop: 24 }}>
  <Text style={styles.sectionTitle}>Roof Specification</Text>

  <Text style={[styles.text, { marginBottom: 30 }]}>
    Roof area covered in this specification: {reference || '________'}
  </Text>
</View>


    {/* IMAGEN DEL PROYECTO */}
    <Image src={image} style={{ width: '100%', height: 'auto', marginBottom: 30 }} />

    {/* Roof specification */}
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Roof specification')} />
  </Page>
)}


{/* pagina 11 */}

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

{/* Página 12 - Preparation */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

 {/* Preparation Section */}
<View style={{ marginTop: 14 }}>
  <Text style={styles.sectionTitle}>Preparation</Text>

  <View style={{ marginLeft: 16, marginBottom: 24 }}>
    <Text style={styles.text}>• The contractor is to carry out their own inspection to satisfy themselves with regards to the extent of the works involved in the preparation of the existing roof coverings and substrate.</Text>
    <Text style={styles.text}>• No claims arising from failure to do so will be considered by LRS.</Text>
    <Text style={styles.text}>• Once the roof has been sufficiently prepared, the whole roof area requiring waterproofing should remain clean. Sweep away any dust etc between coats.</Text>
    <Text style={styles.text}>• The surface must be dry before and during application.</Text>
    <Text style={styles.text}>• Any blisters will need to be checked before over coating with RapidRoof.</Text>
    <Text style={styles.text}>• Blisters within the surface normally indicates moisture under the surface.</Text>
    <Text style={styles.text}>• Any moisture present will need to be dried out before applying any RapidRoof.</Text>
    <Text style={styles.text}>• All mechanical damage will need to be made good where necessary.</Text>
    <Text style={styles.text}>• FastCoat Pro PU Joint Sealer should be used in replacement where existing mastic exists.</Text>
  </View>
</View>


  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('The roof build-up and preparation') + 1} />
</Page>

{/* Página 13 - Cleaning (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

{/* Cleaning Section */}
<View style={{ marginTop: 14 }}>
  <Text style={styles.sectionTitle}>Cleaning</Text>

  <Text style={[styles.textBold, { marginBottom: 8 }]}>
    Guide to Cleaning a Roof for {guarantee === '20-year' ? 'RapidRoof Pro Waterproof' : 'RapidRoof Waterproof'} Application
  </Text>

  <Text style={[styles.text, { marginBottom: 14 }]}>
    Objective: Ensure the roof surface is properly prepared for the application of {guarantee === '20-year' ? 'RapidRoof Pro Waterproof' : 'RapidRoof Waterproof'} to achieve optimal adhesion and performance.
  </Text>

  <Text style={[styles.textBold, { marginBottom: 6 }]}>Materials Needed:</Text>
  <View style={{ marginLeft: 16 }}>
    {[
      "Safety equipment (gloves, goggles, non-slip shoes)",
      "Broom or leaf blower",
      "Scraper or putty knife",
      "2000psi Pressure washer",
      "799 Wash N Prep",
      "Stiff-bristle brush",
      "Clean water",
      "Bucket",
      "Ladder or scaffolding (if necessary)",
      "Tarpaulin (to protect landscaping)",
      "Rapid Pro Detailer (for minor repairs)"
    ].map((item, i) => (
      <Text key={i} style={styles.text}>• {item}</Text>
    ))}
  </View>

  <Text style={[styles.textBold, { marginTop: 14, marginBottom: 6 }]}>Safety Precautions:</Text>
  <View style={{ marginLeft: 16 }}>
    {[
      "Weather Check - ensure weather conditions are dry. Avoid cleaning on windy or rainy days.",
      "Safety Gear - wear appropriate safety gear including gloves, goggles, and non-slip shoes.",
      "Fall Protection - use a harness or secure ladder and scaffolding if working on a steep or high roof.",
      "Electrical Hazards - be aware of overhead power lines."
    ].map((item, i) => (
      <Text key={i} style={styles.text}>• {item}</Text>
    ))}
  </View>

</View>

  {/* Cleaning, TV, satellite arrays, cables (2 pages) */}
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Cleaning, TV, satellite arrays, cables')} />
</Page>

{/* Página 14 - Cleaning (Parte 2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

 {/* Cleaning Steps */}
 <Text style={[styles.textBold, { marginTop: 14, marginBottom: 6 }]}>Cleaning Steps:</Text>
<View style={{ marginLeft: 16, marginTop: 12 }}>
  {[
    "Clear Debris - use a broom or leaf blower to remove loose debris such as leaves, twigs, and dirt. Check for and remove any nesting materials or other obstructions.",
      "Scrape Off Moss and Lichen - use a scraper or putty knife to gently remove moss, lichen, or any stubborn debris. Be careful not to damage the " + (guarantee === '20-year' ? "roofing material." : "existing roofing substrate."),
      "Pressure Washing - use a 2000psi pressure washer to thoroughly wash the roof. Start from the top and work your way down. Maintain a safe distance to avoid damaging the roofing material with excessive pressure.",
      "Apply Cleaning Solution - mix 799 Wash N Prep roof cleaner with water according to the product instructions. Apply the cleaning solution to the roof using a stiff-bristle brush. Scrub gently to remove grime, algae, and mildew. Mixing Ratio is 1 part 799 and 16 parts water.",
    "For stubborn stains or mould, mix 1 part 799 and 8 parts water and apply it to the affected areas. Let it sit for 15–20 minutes before rinsing.",
    "Rinse Thoroughly - rinse the roof thoroughly with clean water to remove all soap and cleaning solution residues. Ensure no cleaner is left behind as it can affect the adhesion of " + (guarantee === '20-year' ? "RapidRoof Pro Waterproof." : "RapidRoof Waterproof."),
    "Inspect and Repair - inspect the roof for any damage, such as cracks, loose shingles, or holes. Repair minor issues with RapidRoof Pro Detailer. Ensure the roof surface is smooth and intact.",
    "Drying - allow the roof to dry completely before applying RapidRoof Primer. This may take several hours to a full day, depending on weather conditions.",
  ].map((item, i) => (
    <Text key={i} style={styles.text}>• {item}</Text>
  ))}
</View>

{/* Final Steps */}
<Text style={[styles.textBold, { marginTop: 16, marginBottom: 6 }]}>Final Steps:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    "Protection - cover any landscaping or structures near the roof with tarpaulin to protect them from cleaning runoff.",
    "Documentation - take photos before and after cleaning to document the condition of the roof."
  ].map((item, i) => (
    <Text key={i} style={styles.text}>• {item}</Text>
  ))}
</View>



  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Cleaning, TV, satellite arrays, cables') + 1} />
</Page>

{/* Pagina 15 parte 3  */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

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

<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Cleaning, TV, satellite arrays, cables') + 2} />
</Page>

{/* Página 16 - Outlets (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* Outlets Section */}
<Text style={styles.sectionTitle}>Outlets</Text>

<Text style={[styles.textBold, { marginBottom: 8 }]}>
  Guide to Applying {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} into Roof Rainwater Outlets (RWO)
</Text>

<Text style={[styles.text, { marginBottom: 14 }]}>
  Objective: Properly apply {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} into Rainwater Outlets, ensuring the waterproofing extends as far into the outlet as possible to create a durable, watertight seal.
</Text>

{/* Materials Needed */}
<Text style={[styles.textBold, { marginBottom: 6 }]}>Materials Needed:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    "PPE",
    `${guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} products`,
    "Mixing stick or drill with a mixing attachment",
    `Application tools – short-piled roller, ${guarantee === '20-year' ? 'paint brush' : 'disposable paint brush'}`,
    `RapidRoof Pro Detailer - when required for difficult details and ${guarantee === '20-year' ? 'snagging' : 'smoothing outlet ridges'}.`
  ].map((item, idx) => (
    <Text key={idx} style={styles.text}>• {item}</Text>
  ))}
</View>

{/* Safety Precautions */}
<Text style={[styles.textBold, { marginTop: 14, marginBottom: 6 }]}>Safety Precautions:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    "Weather Check - ensure weather conditions are dry and the temperature is within the manufacturer's recommended range. Avoid working when rainfall is imminent.",
    "PPE - wear appropriate PPE specific to the requirements of the RapidRoof system and project/site.",
    "Working at height – ensure the correct access and safety systems have been installed / are in situ when working at height.",
    "Electrical Hazards - be aware of overhead power lines and ensure all power tools are used safely."
  ].map((item, idx) => (
    <Text key={idx} style={styles.text}>• {item}</Text>
  ))}
</View>


<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Outlets')} />
</Page>

{/* Página 16 - Outlets (Parte 2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* Preparation Steps */}
<Text style={[styles.textBold, { marginTop: 14, marginBottom: 6 }]}>Preparation Steps:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    "Remove Outlet Grates - carefully remove all outlet grates to allow access to the interior of the outlets.",
    "Ensure the roof surface and outlets are clean, dry, and free from debris, dust, natural build-up and any other loose material. Use a brush or cloth to clean and dry inside the outlet.",
    `Inspect the outlet for any cracks, splits, or damages that need repair. Use RapidRoof Pro Detailer to repair minor damages. Allow all stages of application to cure for 1 hour before commencing with the next stage.`
  ].map((item, idx) => (
    <Text key={idx} style={styles.text}>• {item}</Text>
  ))}
</View>

{/* Application Steps */}
<Text style={[styles.textBold, { marginTop: 14, marginBottom: 6 }]}>Application Steps:</Text>

{/* Apply Primer */}
<Text style={[styles.textBold, { marginBottom: 4 }]}>Apply Primer:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    `Mix ${guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} Primer with Catalyst according to LRS guidelines.`,
    "Apply to all areas requiring waterproofing at a coverage rate of 0.3kg/m² using a brush.",
    guarantee === '20-year'
      ? "Reinforce cracks, joints and changes of angle with Reinforcement Matting embedded while the primer is still wet."
      : null
  ].filter(Boolean).map((item, idx) => (
    <Text key={idx} style={styles.text}>• {item}</Text>
  ))}
</View>

{/* Apply BaseCoat */}
<Text style={[styles.textBold, { marginTop: 10, marginBottom: 4 }]}>Apply BaseCoat:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    `Mix ${guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} BaseCoat with Catalyst according to LRS guidelines.`,
    `Apply using short-pile roller or brush at a coverage rate of ${guarantee === '20-year' ? '1.25kg/m²' : '1kg/m²'}, extend the coverage into the outlet as far as possible.`,
    guarantee === '20-year'
      ? "Immediately embed Reinforcement Matting into BaseCoat. Ensure it is completely saturated and free from creases, standing wicks and pinholes."
      : null
  ].filter(Boolean).map((item, idx) => (
    <Text key={idx} style={styles.text}>• {item}</Text>
  ))}
</View>

{/* Apply TopCoat */}
<Text style={[styles.textBold, { marginTop: 10, marginBottom: 4 }]}>Apply TopCoat:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    `Mix ${guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} TopCoat with Catalyst according to LRS guidelines.`,
    `Apply at a coverage rate of ${guarantee === '20-year' ? '0.75kg/m²' : '0.5kg/m²'} by short-pile roller or brush.`,
    guarantee === '20-year'
      ? "If snagging is required, fill pinholes with RapidRoof Pro Detailer and sand wicks with 80-grit sandpaper before applying TopCoat."
      : null
  ].filter(Boolean).map((item, idx) => (
    <Text key={idx} style={styles.text}>• {item}</Text>
  ))}
</View>


<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Outlets') + 1} />
</Page>

{/* OUtlets 3 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

{/* Final Steps */}
<Text style={[styles.textBold, { marginTop: 14, marginBottom: 4 }]}>Final Steps:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    "Inspect the applied coatings for any defects such as wicks, creases, fish mouths or pinholes.",
    "Once the TopCoat has fully cured, reinstall the outlet grates carefully.",
    "Clean all tools and equipment immediately after use. Dispose of any waste materials following local regulations – used roller heads and brushes should be disposed of.",
    "Take photos before, during, and after the application to document the staged condition of the roof."
  ].map((item, idx) => (
    <Text key={idx} style={styles.text}>• {item}</Text>
  ))}
</View>
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Outlets') + 2} />
</Page>

{/* Página 18  Ponding Water  1/3 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

 {/* Ponding Water / Filling Cracks and Joints */}
<Text style={styles.sectionTitle}>Ponding Water / Filling Cracks and Joints</Text>

<Text style={styles.textBold}>Guide to Using Multi-Purpose Filler for Roofing</Text>

<Text style={[styles.text, { marginBottom: 14 }]}>
  Objective: Properly use the Multi-Purpose Filler (resin and aggregate) to fill ponding areas on a roof, ensuring a level surface that promotes proper drainage and prevents water accumulation. Also used for filled large cracks or splits within the existing surface.
</Text>

<Text style={styles.textBold}>Materials Needed:</Text>
<View style={{ marginLeft: 16, marginBottom: 12 }}>
  {[
    "Safety equipment (gloves, goggles, non-slip shoes)",
    `${guarantee === '10-year' ? "Multi-Purpose Filler Kit" : "Ponding Filler Kit"} components (Resin and Aggregate)`,
    "Mixing stick or drill with a mixing attachment",
    "Scale (for accurate measurement)",
    "Clean mixing container",
    "Application tools (trowel)",
    "Cleaning tools (brush, cloth)",
    "Measuring tools (tape measure, level)",
    "Ladder or scaffolding (if necessary)",
    "Tarpaulin (to protect landscaping and nearby structures)",
    "Masking tape (for neat edges)",
    "RapidRoof Pro Detailer (if required for minor repairs)"
  ].map((item, i) => (
    <Text key={i} style={styles.text}>• {item}</Text>
  ))}
</View>

<Text style={styles.textBold}>Safety Precautions:</Text>
<View style={{ marginLeft: 16, marginBottom: 12 }}>
  {[
    "Wear Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes to protect against splashes and fumes.",
    "Ventilation: Ensure good ventilation when mixing and applying the product.",
    "Handling Chemicals: Handle all components with care as they can be hazardous. Follow the LRS safety guidelines."
  ].map((item, i) => (
    <Text key={i} style={styles.text}>• {item}</Text>
  ))}
</View>


<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Multi-Purpose Filler')} />
</Page>

{/* Página 19  Ponding Water  2/3*/}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.textBold}>Preparation Steps:</Text>
<View style={{ marginLeft: 16 }}>
  {[
    "Identify Ponding Areas, Cracks or Splits:",
    "– Locate all areas on the roof where water ponds or has cracks and splits. Measure the size and depth of these areas to determine the amount of Multi-Purpose Filler needed.",
    "Clean the Roof:",
    "– Ensure the roof surface is clean, dry, and free from debris, dust, and any loose material.",
    "Inspect for Damage:",
    "– Inspect the areas for any underlying damage. Repair any minor cracks or splits using RapidRoof Pro Detailer. Allow repairs to cure fully."
  ].map((item, i) => (
    <Text key={i} style={styles.text}>{item}</Text>
  ))}
</View>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 12, marginBottom: 6 }}>
  Mixing Steps:
</Text>

{guarantee === '10-year' && (
  <Text style={{ fontSize: 12, marginBottom: 4 }}>
    • RapidRoof Primer should be applied before the application of the Multi-Purpose Filler. This should be applied at 0.3kg per m².
  </Text>
)}

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Prepare the Components:</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>– Resin: The binding component.</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>– Aggregate: The filler material.</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Determine the Mixing Ratio:</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>
  – Follow LRS instructions for the correct ratio of resin to aggregate. Typically, the ratio is provided by weight or volume.
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Measure and Mix:</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>– Resin: Measure the required amount of resin and pour it into a clean mixing container.</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>– Aggregate: Measure the required amount of aggregate. Catalyst is premixed with the aggregate.</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 6 }}>
  – Mix Thoroughly: Gradually add the aggregate to the resin while continuously mixing. Use a mixing stick or drill with a mixing attachment to blend the components until the mixture is uniform and has a consistent texture.
</Text>


<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Multi-Purpose Filler') + 1} />
</Page>

{/* Página 20  Ponding Water  3/3 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>
  Application Steps:
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Apply the Multi-Purpose Filler:</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>
  – Use a trowel to apply the mixed Multi-Purpose Filler to the ponding areas, cracks or splits. RapidRoof Primer should be applied before the application of the Multi-Purpose Filler.
</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>
  – Ensure the filler is pressed firmly into the area, filling it completely and removing any air pockets.
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Level the Surface:</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>
  – Use a level to ensure the filled area is even with the surrounding roof surface. Smooth the surface of the filled area to match the roof profile. Remove any excess filler and ensure a neat finish.
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Allow to Dry:</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>
  – Allow the Multi-Purpose Filler to dry. This is typically 20 minutes. The drying time may vary based on environmental conditions and the specific product used.
</Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>
  Final Inspection and Protection:
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Inspect the Filled Area:</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>
  – Check the filled area for any signs of shrinkage, cracking, or other imperfections. If necessary, apply additional filler and smooth again.
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Clean Up:</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>
  – Clean all tools and equipment immediately after use.
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Document the Repair:</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>
  – Take photos before, during, and after the application to document the condition of the roof and the work completed.
</Text>

  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Multi-Purpose Filler') + 2} />
</Page>


{/* Página 21 - Waterproof Coverings */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />


  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>
  Maintenance:
</Text>

{[
  "Regular Inspection: Regularly inspect the roof to ensure that no new ponding areas, cracks or splits have developed and that the filled areas remain intact.",
  "Proper Drainage: Ensure that roof drains, gutters, and downspouts are clear and functioning properly to prevent water accumulation."
].map((item, i) => (
  <Text key={i} style={{ fontSize: 12, marginBottom: 6 }}>
    • {item}
  </Text>
))}

  <Text style={{ fontSize: 12, marginTop: 14 }}>
    By following these steps, you ensure that ponding areas, cracks and splits on the roof are properly filled using a Multi-Purpose Filler, resulting in a level surface that promotes proper drainage and prevents water accumulation. This helps maintain the integrity of the roofing system and prolongs its lifespan.
  </Text>

{/* Waterproof Coverings */}
<Text style={styles.sectionTitle}>Waterproof Coverings</Text>

<Text style={styles.textBold}>20 minutes curing time</Text>

<Text style={styles.textBold}>Timing Considerations:</Text>

<View style={{ marginLeft: 16, marginBottom: 12 }}>
  <Text style={styles.text}>• 20-Minute Cure Time:</Text>
  <Text style={styles.text}>– Work Quickly: Due to the 20-minute cure time, work in small, manageable sections. Mix only the amount of product that can be applied within this timeframe.</Text>
  <Text style={styles.text}>– Monitor Conditions: Monitor the weather conditions and temperature closely. Higher temperatures can accelerate the curing process, reducing the working time.</Text>

  <Text style={[styles.text, { marginTop: 10 }]}>• Curing Process:</Text>
  <Text style={styles.text}>– Inspect Application: Immediately after application, inspect for any bubbles, wrinkles, or uncoated areas and smooth out as necessary.</Text>
  <Text style={styles.text}>– Allow to Cure: Within 20 minutes, the {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} will begin to cure. Ensure no traffic or disturbance occurs during this time.</Text>
</View>


  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Waterproof coverings otra mas*/}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

<Text style={styles.textBold}>Final Inspection and Protection:</Text>

<View style={{ marginLeft: 16, marginBottom: 12 }}>
  <Text style={styles.text}>• Inspect and Smooth:</Text>
  <Text style={styles.text}>– Inspect the applied coatings for any imperfections. Smooth out any areas{guarantee === '20-year' ? '' : ','} if necessary, before the product fully cures.</Text>

  <Text style={[styles.text, { marginTop: 8 }]}>• Allow to Cure Completely:</Text>
  <Text style={styles.text}>– Allow all applied {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} products to cure completely for overcoating, recommended leaving 1 hour. Full cure time may vary based on environmental conditions.</Text>

  <Text style={[styles.text, { marginTop: 8 }]}>• Protection:</Text>
  <Text style={styles.text}>– Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.</Text>

  <Text style={[styles.text, { marginTop: 8 }]}>• Documentation:</Text>
  <Text style={styles.text}>– Take photos before, during, and after the application to document the condition of the roof and the work completed.</Text>
</View>

<Text style={styles.text}>
  By following these steps and considering the 20-minute cure time of {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'}, you ensure that the application is properly executed, creating a durable and waterproof surface that will protect the roof for years to come.
</Text>

<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 22 - Catalyst Ratio (Parte 1) */}
{(guarantee === '10-year' || guarantee === '20-year') && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

   {/* Catalyst Ratio */}
<Text style={styles.sectionTitle}>Catalyst Ratio</Text>

<Text style={styles.textBold}>
  Guide to Adjusting Catalyst Ratio for {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'}
</Text>

<Text style={[styles.text, { marginBottom: 10 }]}>
  Objective: Properly mix {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} with the correct catalyst ratio to ensure optimal curing times and performance.
</Text>

<Text style={styles.textBold}>Materials Needed:</Text>
<View style={{ marginLeft: 16, marginBottom: 12 }}>
  <Text style={styles.text}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
  <Text style={styles.text}>
    • {guarantee === '20-year'
      ? 'RapidRoof Pro product (Primer, BaseCoat, TopCoat, Pro Detailer)'
      : 'RapidRoof product (Primer, BaseCoat, TopCoat, Pro Detailer and Anti-Skid)'}
  </Text>
  <Text style={styles.text}>• Catalyst</Text>
  <Text style={styles.text}>• Mixing stick or drill with a mixing attachment</Text>
  <Text style={styles.text}>• Scale (for accurate measurement)</Text>
  <Text style={styles.text}>• Clean mixing container</Text>
  <Text style={styles.text}>• Measuring tools (for catalyst and product)</Text>
  <Text style={styles.text}>• Application tools (roller or brush)</Text>
</View>

<Text style={styles.textBold}>Safety Precautions:</Text>
<View style={{ marginLeft: 16, marginBottom: 12 }}>
  <Text style={styles.text}>• Wear Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes to protect against splashes and fumes.</Text>
  <Text style={styles.text}>• Ventilation: Ensure good ventilation when mixing and applying the product.</Text>
  <Text style={styles.text}>• Handling Chemicals: Handle the catalyst with care as it can be hazardous. Follow the MSDS safety guidelines.</Text>
</View>

<Text style={styles.textBold}>Catalyst Ratio:</Text>
<View style={{ marginLeft: 16, marginBottom: 12 }}>
  <Text style={styles.text}>• Standard Ratio: 20g of catalyst to every 1kg of product (2% catalyst ratio)</Text>
  <Text style={styles.text}>• Adjustable Range: 1% to 4% catalyst ratio, depending on temperature and desired curing time.</Text>
</View>

    <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

  </Page>
)}


{/* Página 23 - Catalyst Ratio (Parte 2) */}
{(guarantee === '10-year' || guarantee === '20-year') && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <Text style={styles.textBold}>Calculating Catalyst Amounts:</Text>
<View style={{ marginLeft: 16 }}>
  <Text style={styles.text}>• Determine the Product Amount:</Text>
  <Text style={styles.text}>– Measure the amount of {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} product you need to mix.</Text>

  <Text style={[styles.text, { marginTop: 8 }]}>• Calculate Catalyst Based on Desired Ratio:</Text>
  <Text style={styles.text}>– 1% Catalyst Ratio: 10g of catalyst per 1kg of product</Text>
  <Text style={styles.text}>– 2% Catalyst Ratio: 20g of catalyst per 1kg of product</Text>
  <Text style={styles.text}>– 3% Catalyst Ratio: 30g of catalyst per 1kg of product</Text>
  <Text style={styles.text}>– 4% Catalyst Ratio: 40g of catalyst per 1kg of product</Text>
</View>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>
  Example Calculations:
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• For 1kg of Product:</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>– 1% Ratio: 10g catalyst</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>– 2% Ratio: 20g catalyst</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>– 3% Ratio: 30g catalyst</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>– 4% Ratio: 40g catalyst</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• For 5kg of Product:</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>– 1% Ratio: 50g catalyst</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>– 2% Ratio: 100g catalyst</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>– 3% Ratio: 150g catalyst</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 6 }}>– 4% Ratio: 200g catalyst</Text>

<Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>
  Mixing Steps:
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Measure the Product:</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>
  – Weigh the required amount of {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} product using a scale.
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Measure the Catalyst:</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>
  – Weigh the appropriate amount of catalyst based on the chosen ratio.
</Text>

    <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

  </Page>
)}

{(guarantee === '10-year' || guarantee === '20-year') && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <Text style={{ fontSize: 12, marginBottom: 2 }}>• Mix the Product and Catalyst:</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>
  – Pour the {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} product into a clean mixing container.
</Text>
<Text style={{ fontSize: 12, marginLeft: 12 }}>
  – Add the catalyst to the product.
</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 6 }}>
  – Thoroughly mix using a mixing stick or a drill with attachment until uniform.
</Text>

<Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>
  Application:
</Text>
<Text style={{ fontSize: 12, marginBottom: 2 }}>• Apply the mixed product promptly as curing begins once catalyst is added.</Text>
<Text style={{ fontSize: 12, marginBottom: 6 }}>• Work in manageable sections to avoid the product curing before application is complete.</Text>

<Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>
  Notes on Environmental Conditions:
</Text>
<Text style={{ fontSize: 12, marginBottom: 2 }}>• Higher Temperatures: Use a lower catalyst ratio to slow curing.</Text>
<Text style={{ fontSize: 12, marginBottom: 6 }}>• Lower Temperatures: Use a higher catalyst ratio to speed up curing.</Text>

<Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>
  Final Inspection and Documentation:
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Inspect the Mixture:</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>
  – Ensure no unmixed catalyst or product remains.
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Apply and Allow to Cure:</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 4 }}>
  – Follow application steps and allow full curing.
</Text>

<Text style={{ fontSize: 12, marginBottom: 2 }}>• Document the Process:</Text>
<Text style={{ fontSize: 12, marginLeft: 12, marginBottom: 6 }}>
  – Take photos before, during and after application.
</Text>

<Text style={{ fontSize: 12, marginTop: 4 }}>
  By adjusting the catalyst ratio within the 1–4% range, you can control the curing time of {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} to suit the environmental conditions and your application needs.
</Text>

<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

  </Page>
)}

{/* Página 24 - Existing Details, Terminations and Upstands (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* TÍTULO PRINCIPAL */}
  <Text style={styles.sectionTitle}>
    Existing Details, Terminations and Upstands
  </Text>
  <Text style={[styles.text, { marginBottom: 20 }]}>
    Guide to Treating Existing Details, Terminations, and Upstands on a Roof at a 150mm Minimum Height
  </Text>

  {/* OBJECTIVE */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
  <Text style={[styles.text, { marginBottom: 20 }]}>
    Ensure all existing details, terminations, and upstands on the roof are properly treated
    {guarantee === '20-year' || fullyPrimedSurfaces.includes(surface)
      ? ', primed and waterproofed'
      : ' and waterproofed'} to a minimum height of 150mm using RapidRoof products.
  </Text>

  {/* DEFINITIONS */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Definitions:</Text>
  <Text style={styles.listItem}>• <Text style={styles.label}>Details:</Text> Specific areas on a roof where different materials or surfaces meet, such as around vents, skylights, and chimneys.</Text>
  <Text style={styles.listItem}>• <Text style={styles.label}>Terminations:</Text> Points where roofing materials end or transition, such as edges, eaves, and parapet walls.</Text>
  <Text style={[styles.listItem, { marginBottom: 20 }]}>• <Text style={styles.label}>Upstands:</Text> Vertical or inclined surfaces that rise from the main roof surface, such as walls, curbs, and penetrations.</Text>

  {/* MATERIALS NEEDED */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
  <Text style={styles.listItem}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
  <Text style={styles.listItem}>• RapidRoof products (Primer, BaseCoat, TopCoat, Detailer)</Text>
  <Text style={styles.listItem}>• Mixing stick or drill with a mixing attachment</Text>
  <Text style={styles.listItem}>• Measuring tools (scale for measuring product, tape measure for area calculation)</Text>
  <Text style={styles.listItem}>• Application tools (Short pile roller or brush)</Text>
  {(guarantee === '20-year' || fullyPrimedSurfaces.includes(surface)) && (
    <Text style={styles.listItem}>• Joint Tape</Text>
  )}
  <Text style={styles.listItem}>• RapidRoof Pro Detailer (for minor repairs)</Text>
  <Text style={styles.listItem}>• Scraper or putty knife</Text>
  <Text style={styles.listItem}>• Clean cloth or brush</Text>
  <Text style={styles.listItem}>• Ladder or scaffolding (if necessary)</Text>

  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>


{/* Página 25 - Parte 2 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* CONTINUACIÓN MATERIALS */}
  <Text style={styles.listItem}>• Tarpaulin (to protect landscaping and nearby structures)</Text>
  <Text style={styles.listItem}>• Masking tape (for neat edges)</Text>
  <Text style={[styles.listItem, { marginBottom: 20 }]}>• Scissors or utility knife</Text>

  {/* SAFETY PRECAUTIONS */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
  <Text style={styles.listItem}>• Weather Check: Ensure weather conditions are dry and the temperature is between 0°c to 35°c recommended range. Avoid working on windy or rainy days.</Text>
  <Text  style={styles.listItem}>• Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes.</Text>
  <Text style={styles.listItem}>• Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
  <Text style={styles.listItem}>• Electrical Hazards: Be aware of overhead power lines.</Text>

  {/* PREPARATION STEPS */}
<Text style={[styles.label, { marginBottom: 10 }]}>Preparation Steps:</Text>

<Text style={[styles.listItem, { marginBottom: 2 }]}>• <Text style={styles.label}>Clean the Roof</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  – Ensure the roof surface, including all details, terminations, and upstands, is clean, dry, and free from debris, dust, and any loose material.
</Text>

<Text style={[styles.listItem, { marginBottom: 2 }]}>• <Text style={styles.label}>Inspect for Damage</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  – Inspect all details, terminations, and upstands for cracks, splits, or damages that need repair. Use RapidRoof Pro Detailer to repair minor damages. Allow repairs to cure fully.
</Text>

<Text style={[styles.listItem, { marginBottom: 2 }]}>• <Text style={styles.label}>Prepare Specific Areas</Text></Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – <Text style={styles.label}>Details:</Text> Around vents, skylights, chimneys, and other roof penetrations, ensure the surfaces are clean and intact. Remove any old sealant or damaged materials.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – <Text style={styles.label}>Terminations:</Text> Ensure edges, eaves, and parapet walls are properly cleaned and free from any loose materials. Address any gaps or weaknesses.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  – <Text style={styles.label}>Upstands:</Text> Clean vertical or inclined surfaces that connect to the main roof surface. Ensure these areas are smooth and ready for primer and waterproofing layers.
</Text>


<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>
</Page>

{/* Página 26 - Parte 3 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* APPLICATION STEPS */}
<Text style={[styles.label, { marginBottom: 10 }]}>Application Steps:</Text>

<Text style={[styles.listItem, { marginBottom: 2 }]}>• <Text style={styles.label}>Apply Primer</Text></Text>

{guarantee !== '20-year' && fullyPrimedSurfaces.includes(surface) && (
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 6 }]}>
    – Surface must be fully primed.
  </Text>
)}

<Text style={[styles.text, { marginLeft: 16 }]}>
  – <Text style={styles.label}>Mix and Apply:</Text> Thoroughly mix RapidRoof Primer and Primer Catalyst. Apply a layer of primer at a coverage rate of 0.3kg per m² to {fullyPrimedSurfaces.includes(surface)
    ? 'the whole roof, details, terminations, and upstands'
    : 'joints, details, terminations, and upstands'} using a brush or roller. Ensure even coverage to a minimum height of 150mm.
</Text>

{(guarantee === '20-year' || fullyPrimedSurfaces.includes(surface)) && (
  <Text style={[styles.text, { marginLeft: 16 }]}>
    – <Text style={styles.label}>Reinforcement:</Text> While the primer is still wet, reinforce any joints, cracks, splits and changes of substrate using 150gsm Joint Tape.
  </Text>
)}

<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  – <Text style={styles.label}>Drying:</Text> Allow the primer to dry completely.
</Text>

<Text style={[styles.listItem, { marginBottom: 2 }]}>
  • <Text style={styles.label}>
    {guarantee === '20-year'
      ? 'Apply BaseCoat and Reinforcement Matting'
      : 'Apply BaseCoat'}
  </Text>
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>
  – <Text style={styles.label}>Mix BaseCoat:</Text> Thoroughly mix RapidRoof BaseCoat with the Waterproof Catalyst.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>
  – <Text style={styles.label}>Apply BaseCoat:</Text> Apply the BaseCoat at a coverage rate of {guarantee === '20-year' ? '1.25kg' : '1kg'} per m² to all prepared areas, ensuring coverage to a minimum height of 150mm.
</Text>

{guarantee === '20-year' && (
  <Text style={[styles.text, { marginLeft: 16 }]}>
    – <Text style={styles.label}>Reinforcement Matting:</Text> For additional strength, especially at transitions and corners, embed 150gsm reinforcement matting into the wet BaseCoat. Smooth out with a roller or brush to remove air pockets and ensure proper adhesion.
  </Text>
)}

  {/* DETAILER */}
<Text style={styles.listItem}>• <Text style={styles.label}>Apply Detailer for Specific Areas (If Required)</Text></Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – <Text style={styles.label}>Mix Detailer:</Text> Thoroughly mix RapidRoof Pro Detailer and Catalyst.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  – <Text style={styles.label}>Apply Detailer:</Text> Use RapidRoof Pro Detailer to seal around penetrations, terminations, upstands, and to fill any pinholes, ensuring a seamless and watertight finish. Apply the Detailer to a minimum height of 150mm above the roof surface. Use a brush to work the Detailer into tight spots and transitions.
</Text>

{/* TOPCOAT */}
<Text style={styles.listItem}>• <Text style={styles.label}>Apply TopCoat</Text></Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – <Text style={styles.label}>Mix TopCoat:</Text> Thoroughly mix RapidRoof TopCoat with the Waterproof Catalyst.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  – <Text style={styles.label}>Apply TopCoat:</Text> Apply a layer of TopCoat at a coverage rate of {guarantee === '20-year' ? '0.75kg' : '0.5kg'} per m² to all detailed areas, terminations, and upstands. Ensure even coverage and smooth application, extending to a minimum height of 150mm above the roof surface.
</Text>


  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page> 

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

{/* FINAL INSPECTION */}
<Text style={[styles.label, { marginBottom: 10 }]}>Final Inspection and Protection:</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Inspect and Smooth</Text></Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Inspect the applied coatings for any bubbles, wrinkles, pinholes, or uncoated areas. Smooth out any imperfections and ensure the surface is even.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Allow to Cure</Text></Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Allow all applied RapidRoof products to cure completely. This is typically 20 minutes depending on weather conditions.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Protection</Text></Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Documentation</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  – Take photos before, during, and after the application to document the condition of the roof and the work completed.
</Text>

{/* CIERRE */}
<Text style={[styles.text, { marginTop: 10 }]}>
  By following these steps, you ensure that all existing details, terminations, and upstands on the roof are properly treated and waterproofed to a minimum height of 150mm, providing a durable and effective waterproofing solution.
</Text>

<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page> 

{/* Página 27 - Guide to Waterproofing into a Chase (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* TÍTULO PRINCIPAL */}
  <Text style={styles.sectionTitle}>
    Guide to Waterproofing into a Chase
  </Text>
  <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
  <Text style={[styles.text, { marginBottom: 20 }]}>
    Properly waterproof into a chase to ensure a watertight seal and prevent water ingress at junctions between roof surfaces and walls or other vertical structures.
  </Text>

  {/* MATERIALS NEEDED */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
  <Text style={styles.listItem}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
  {guarantee === '20-year' ? (
    <>
      <Text style={styles.listItem}>• Waterproofing membrane (e.g., RapidRoof products)</Text>
      <Text style={styles.listItem}>• Primer (if required by the waterproofing system)</Text>
      <Text style={styles.listItem}>• BaseCoat and TopCoat (if using a layered waterproofing system)</Text>
      <Text style={styles.listItem}>• Sealant suitable for masonry and waterproofing</Text>
    </>
  ) : (
    <>
      <Text style={styles.listItem}>• Primer</Text>
      <Text style={styles.listItem}>• RapidRoof BaseCoat and TopCoat</Text>
      <Text style={styles.listItem}>• LRS PU Mastic for masonry and waterproofing</Text>
    </>
  )}
  <Text style={styles.listItem}>• Chasing tool (angle grinder with diamond blade or masonry chisel)</Text>
  <Text style={styles.listItem}>• Cleaning tools (brush, vacuum)</Text>
  <Text style={styles.listItem}>• Measuring tools (tape measure, level)</Text>
  <Text style={styles.listItem}>• Application tools (roller, brush{guarantee === '20-year' ? ', squeegee' : ''})</Text>
  {guarantee === '20-year' && <Text style={styles.listItem}>• Reinforcement matting (if required)</Text>}
  <Text style={styles.listItem}>• Clean cloth or brush</Text>
  <Text style={styles.listItem}>• Masking tape</Text>
  <Text style={styles.listItem}>• Ladder or scaffolding (if necessary)</Text>
  <Text style={styles.listItem}>• Tarpaulin (to protect landscaping and nearby structures)</Text>
  <Text style={[styles.listItem, { marginBottom: 20 }]}>• Mortar mix or cementitious repair product</Text>

  {/* SAFETY */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
  <Text style={styles.listItem}>• Weather Check: Ensure weather conditions are dry and the temperature is {guarantee === '20-year' ? "within the manufacturer's recommended range" : 'within 0°c to 35°c temperature range'}. Avoid working on windy or rainy days.</Text>
  <Text style={styles.listItem}>• Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes.{guarantee !== '20-year' && ' Please read the RapidRoof MSDS for more information.'}</Text>
 
  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 28 - Parte 2 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.listItem}>• Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
  <Text style={styles.listItem}>• Electrical Hazards: Be aware of overhead power lines and ensure all power tools are used safely.</Text>

{/* PREPARATION STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>

<Text style={styles.listItem}>• Determine the Location of the Chase:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Identify the area where the chase needs to be cut. Typically, this will be where the roof meets a vertical structure, such as a wall.
</Text>

<Text style={styles.listItem}>• Cut the Chase:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Use an angle grinder with a diamond blade or a masonry chisel to cut a horizontal chase into the wall{guarantee !== '20-year' ? ' at the height of 150mm' : ''}. The depth and width should be sufficient to embed the waterproofing membrane securely (usually about 20–25mm deep and wide).
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Ensure the chase is level and continuous along the length where waterproofing is required.
</Text>

<Text style={styles.listItem}>• Clean the Chase:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  – Remove all dust and debris from the chase using a brush and vacuum. The chase must be clean and dry before applying any waterproofing materials.
</Text>

{/* APPLICATION STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Application Steps:</Text>

<Text style={styles.listItem}>• Apply Primer:</Text>
{guarantee !== '20-year' && !fullyPrimedSurfaces.includes(surface) && (
  <Text style={[styles.text, { marginLeft: 16 }]}>
    – Brickwork should be fully primed.
  </Text>
)}
<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  – {guarantee === '20-year'
    ? 'If using a waterproofing system that requires a primer, apply it to the roof surface and into the chase according to the manufacturer’s instructions. Allow to dry completely.'
    : 'Apply RapidRoof Primer at a coverage rate of 0.3kg per m² to the upstand and into the chase. Allow to dry completely, typically 20 minutes.'
  }
</Text>

{guarantee === '20-year' ? (
  <>
    <Text style={styles.listItem}>• Apply BaseCoat and Reinforcement Matting (if required):</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      – <Text style={styles.label}>Mix BaseCoat:</Text> Thoroughly mix the BaseCoat product according to the manufacturer’s instructions.
    </Text>
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
      – <Text style={styles.label}>Apply BaseCoat:</Text> Apply the BaseCoat to the roof surface, extending it into the chase. Use a brush or small roller to work it in.
    </Text>
  </>
) : (
  <>
    <Text style={styles.listItem}>• Apply BaseCoat:</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      – <Text style={styles.label}>Mix BaseCoat:</Text> Thoroughly mix RapidRoof BaseCoat with the waterproof catalyst using a mixing stick or drill.
    </Text>
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
      – <Text style={styles.label}>Apply BaseCoat:</Text> Apply at 1kg per m² to the upstand and into the chase. Use a brush or roller to ensure full embedment.
    </Text>
  </>
)}


<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {guarantee === '20-year' ? (
  <>
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
      – <Text style={styles.label}>Reinforcement Matting:</Text> If required, embed the matting into the wet BaseCoat, ensuring it reaches into the chase and is fully saturated.
    </Text>

    <Text style={styles.listItem}>• Apply Waterproofing Membrane:</Text>
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
      – Apply the waterproofing membrane (e.g. RapidRoof Pro) over the BaseCoat, extending it into the chase. Press firmly to eliminate air pockets and ensure proper embedment.
    </Text>

    <Text style={styles.listItem}>• Second Layer:</Text>
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
      – Apply a second layer of BaseCoat or TopCoat over the membrane to fully seal the chase.
    </Text>
  </>
) : (
  <>
    <Text style={styles.listItem}>• Apply TopCoat:</Text>
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
      – Apply RapidRoof TopCoat over the cured BaseCoat at 0.5kg per m², ensuring complete coverage and sealing into the chase.
    </Text>
  </>
)}


{/* SEALING */}
<Text style={styles.listItem}>• Seal the Chase:</Text>
{guarantee === '20-year' ? (
  <>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      – <Text style={styles.label}>Apply Sealant:</Text> Once fully cured, apply a high-quality sealant suitable for masonry to the chase for additional protection and to secure the membrane.
    </Text>
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
      – <Text style={styles.label}>Mortar Mix:</Text> Fill the chase with suitable mortar or cementitious repair product, pressing firmly to secure the membrane and sealant. Smooth for a clean finish.
    </Text>
  </>
) : (
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
    – <Text style={styles.label}>Apply Sealant:</Text> Once cured, apply LRS PU Mastic into the chase to terminate and secure the waterproofing layers.
  </Text>
)}
{/* FINAL INSPECTION */}
<Text style={[styles.label, { marginTop: 20, marginBottom: 6 }]}>
  Final Inspection and Protection:
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Inspect and Smooth</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Inspect the waterproofed area for any bubbles, wrinkles, or uncovered sections. Smooth out any imperfections and ensure the membrane is securely {guarantee === '20-year' ? 'embedded' : 'waterproofed'} in the chase.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Allow to Cure</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Allow all applied materials to cure completely {guarantee === '20-year' ? 'according to the manufacturer’s instructions' : 'according to this specification'}.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Protection</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 4 }]}>
  – Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Documentation</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  – Take photos before, during, and after the application to document the condition of the roof and the work completed.
</Text>

<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>


{(guarantee === '20-year' || (guarantee === '10-year' && fullyPrimedSurfaces.includes(surface))) && (
  <>
    {/* Página 30 */}
    <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

      <Text style={styles.text}>
  By following these steps, you ensure that the waterproofing into a chase is properly executed, creating a durable and watertight seal that will protect against water ingress at junctions between roof surfaces and vertical structures.
</Text>

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

{/* MATERIALS NEEDED */}
<Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
<Text style={styles.listItem}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
<Text style={styles.listItem}>• RapidRoof Primer</Text>
<Text style={styles.listItem}>• Mixing stick or drill with a mixing attachment</Text>
<Text style={styles.listItem}>• Measuring tools (scale for Primer, tape measure for area)</Text>
<Text style={styles.listItem}>• Application tools (short pile roller or brush)</Text>
<Text style={styles.listItem}>• Roller extension pole (for large areas)</Text>
<Text style={styles.listItem}>• Clean cloth or brush</Text>
<Text style={styles.listItem}>• Ladder or scaffolding (if necessary)</Text>
<Text style={[styles.listItem, { marginBottom: 20 }]}>• Tarpaulin (to protect landscaping or nearby structures)</Text>

{/* SAFETY PRECAUTIONS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
<Text style={styles.listItem}>• Weather Check:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Ensure dry conditions with temperatures between 0°C and 35°C. Avoid working on windy or rainy days.
</Text>
<Text style={styles.listItem}>• Safety Gear:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Always wear gloves, goggles, and non-slip footwear during application.
</Text>

      <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

    </Page>

    {/* Página 31 */}
    <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

      <Text style={styles.listItem}>• Fall Protection:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Use harnesses or secure ladders/scaffolding when working at height or on steep roofs.
</Text>
<Text style={styles.listItem}>• Electrical Hazards:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  – Be aware of any overhead power lines or electrical risks.
</Text>

{/* PREPARATION STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>

<Text style={styles.listItem}>• Clean the Roof:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  – Ensure the roof surface is clean, dry, and free from dust, debris, or loose material. Follow the cleaning steps outlined in previous guides.
</Text>

<Text style={styles.listItem}>• Inspect the Roof:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  – Check for any cracks, splits, or damage that require repair. Confirm all repairs are complete and fully cured before primer application.
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
  </>
)}
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

<Text style={styles.text}>
By following these steps, you ensure that the RapidRoof Primer is properly
applied, creating a suitable base for the subsequent application of RapidRoof
BaseCoat, TopCoat, or other layers as required.
</Text>

<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 32 - RapidRoof BaseCoat (parte 1/2) */}
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

{/* OBJECTIVE */}
<Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
<Text style={[styles.text, { marginBottom: 20 }]}>
  Apply RapidRoof BaseCoat
  {guarantee === '20-year'
    ? ' with 150gsm reinforcement matting at a coverage rate of 1.25kg per m²'
    : ' at a coverage rate of 1kg per m²'} to create a durable and watertight roofing surface that serves as a foundation for the full waterproofing system.
</Text>

{/* MATERIALS NEEDED */}
<Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
<Text style={styles.listItem}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
<Text style={styles.listItem}>• RapidRoof BaseCoat</Text>
{guarantee === '20-year' && (
  <Text style={styles.listItem}>• 150gsm Reinforcement Matting</Text>
)}
<Text style={styles.listItem}>• Mixing stick or drill with mixing attachment</Text>
<Text style={styles.listItem}>• Measuring tools (scale for BaseCoat, tape measure for area)</Text>
<Text style={styles.listItem}>• Application tools (roller or brush)</Text>
<Text style={styles.listItem}>• Roller extension pole (for large areas)</Text>
<Text style={styles.listItem}>• Clean cloth or brush</Text>
<Text style={styles.listItem}>• Ladder or scaffolding (if required)</Text>
<Text style={[styles.listItem, { marginBottom: 20 }]}>• Tarpaulin (to protect nearby landscaping or surfaces)</Text>

 {/* SAFETY PRECAUTIONS */}
 <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
<Text style={styles.listItem}>• <Text style={styles.label}>Weather Conditions:</Text> Ensure dry conditions with temperatures between 0°C and 35°C. Avoid windy or rainy days.</Text>
<Text style={styles.listItem}>• <Text style={styles.label}>Safety Gear:</Text> Always wear protective gloves, goggles, and footwear with good grip.</Text>

  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 33 - RapidRoof BaseCoat (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

<Text style={styles.listItem}>• <Text style={styles.label}>Fall Protection:</Text> Use harnesses, ladders, or scaffolding when working at heights or on steep surfaces.</Text>
<Text style={[styles.listItem, { marginBottom: 20 }]}>• <Text style={styles.label}>Electrical Hazards:</Text> Be cautious of any overhead power lines in the work area.</Text>

{/* PREPARATION STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>
<Text style={styles.listItem}>• <Text style={styles.label}>Clean the Roof:</Text></Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Ensure the entire roof surface is clean, dry, and free of loose materials, dust, or contaminants. Follow the surface cleaning procedures outlined in previous sections.
</Text>

<Text style={styles.listItem}>• <Text style={styles.label}>Inspect the Roof:</Text></Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  Carefully examine the surface for any remaining cracks, splits, or damage. All repairs must be fully cured before proceeding with the BaseCoat application.
</Text>


{/* APPLICATION */}
<Text style={[styles.label, { marginBottom: 6, width: '100%' }]}>
  {guarantee === '20-year'
    ? 'Application of RapidRoof BaseCoat with Reinforcement Matting:'
    : 'Application of RapidRoof BaseCoat:'}
</Text>

{guarantee === '20-year' ? (
  <>
    <Text style={styles.listItem}>• Measure and Cut Matting:</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      Measure the area of the roof and cut the 150gsm reinforcement matting to fit, allowing for overlaps as specified by the manufacturer (typically 50–100mm).
    </Text>
  </>
) : (
  <>
    <Text style={styles.listItem}>• Measure Area or Grid Out Tins:</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      Measure the area of the roof and ensure the RapidRoof BaseCoat is applied to the correct coverage rate.
    </Text>
  </>
)}

<Text style={styles.listItem}>• Mix RapidRoof BaseCoat:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Thoroughly mix the RapidRoof BaseCoat and Waterproof Catalyst. Use a mixing stick or a drill with a mixing attachment for even consistency.
</Text>

<Text style={styles.listItem}>• Apply BaseCoat:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Using a roller and brush, apply a layer of RapidRoof BaseCoat at a coverage rate of {guarantee === '20-year' ? '1.25kg per m²' : '1kg per m²'}. Work in manageable sections to ensure the BaseCoat does not dry before {guarantee === '20-year' ? 'laying the matting' : 'the mixed product is applied'}.
</Text>

  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

{guarantee === '20-year' && (
  <>
    <Text style={styles.listItem}>• Lay Reinforcement Matting:</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      Immediately lay the 150gsm reinforcement matting onto the wet BaseCoat. Press the matting into the BaseCoat to eliminate air pockets and wrinkles. Use a roller to ensure the matting is fully embedded and saturated.
    </Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      Feather the edges to blend the reinforced area with the surrounding roof surface.
    </Text>
  </>
)}

<Text style={styles.listItem}>• Smooth and Inspect:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  Use the roller or brush to smooth out any bubbles or imperfections{guarantee === '20-year' ? '. Ensure the matting is fully embedded and the surface is even.' : '.'}
</Text>

{/* DRYING AND FINAL INSPECTION */}
<Text style={[styles.label, { marginBottom: 6 }]}>Drying and Curing:</Text>

<Text style={styles.listItem}>• Allow to Dry:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Allow the RapidRoof BaseCoat{guarantee === '20-year' ? ' with reinforcement matting' : ''} to dry completely. The drying time will depend on weather conditions, typically 20 minutes.
</Text>

<Text style={styles.listItem}>• Final Inspection:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  Perform a final inspection of the applied BaseCoat{guarantee === '20-year' ? ' and matting' : ''}. Ensure there are no visible bubbles, wrinkles, pinholes or uncoated areas.
</Text>

{/* FINAL STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Final Steps:</Text>

<Text style={styles.listItem}>• Protection:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
</Text>

<Text style={styles.listItem}>• Documentation:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
  Take photos before, during, and after the application to document the condition of the roof and the work completed.
</Text>

<Text style={styles.text}>
  By following these steps, you ensure that the RapidRoof BaseCoat{guarantee === '20-year' ? ' with 150gsm reinforcement matting' : ''} is properly applied, creating a durable and waterproof surface ready for further layers or final finishes as needed.
</Text>

<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 34 - RapidRoof BaseCoat – Inspect (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

 {/* TÍTULO PRINCIPAL */}
<Text style={styles.sectionTitle}>
  {guarantee === '20-year'
    ? 'RapidRoof Pro BaseCoat – Inspect'
    : 'RapidRoof BaseCoat – Inspect'}
</Text>

{/* SUBTÍTULO */}
<Text style={[styles.text, { marginBottom: 10 }]}>
  Steps for Checking RapidRoof BaseCoat
</Text>

{/* VERIFY COVERAGE RATES */}
<Text style={[styles.label, { marginBottom: 6 }]}>Verify Coverage Rates:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Required Rate: The RapidRoof BaseCoat should be applied at a coverage rate of{' '}
  {guarantee === '20-year' ? '1.25kg per m².' : '1kg per m².'}
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Calculate Area: Measure the total area of the roof section that has been coated.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Check Usage: Compare the amount of BaseCoat used to the calculated area to ensure it aligns with the recommended coverage rate. For example, if you coated 20m², you should have used approximately {guarantee === '20-year' ? '25kg' : '20kg'} of BaseCoat (20m² x {guarantee === '20-year' ? '1.25kg/m²' : '1kg/m²'}){guarantee !== '20-year' ? ' this doesn’t include any wastage.' : '.'}
</Text>

{/* INSPECT FOR PINHOLES */}
<Text style={[styles.label, { marginBottom: 6 }]}>Inspect for Pinholes:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Visual Inspection: Perform a thorough visual inspection of the coated surface. Look for small holes or gaps in the coating, known as pinholes.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Lighting: Use a flashlight to shine light across the surface at a low angle. Pinholes will cast small shadows or show up as bright spots.
</Text>
{guarantee === '20-year' && (
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Magnification: Use a magnifying glass to inspect suspicious areas more closely.
  </Text>
)}

{/* ENSURE COMPLETE COVERAGE */}
<Text style={[styles.label, { marginBottom: 6 }]}>Ensure Complete Coverage:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Uniform Thickness: Ensure the coating is uniform in thickness across the entire roof. There should be no thin spots or exposed substrate.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Edges and Corners: Pay special attention to edges, corners, and transitions, as these areas are more prone to insufficient coverage.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
  Overlaps: Check overlaps where different sections meet to ensure they are seamless and properly bonded.
</Text>

  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 35 - RapidRoof BaseCoat – Inspect (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* ADDRESSING DEFICIENCIES */}
<Text style={[styles.label, { marginBottom: 6 }]}>Addressing Deficiencies:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Pinholes: If pinholes are found, mark them with chalk or tape. Prepare a small amount of RapidRoof Pro Detailer and use a brush to fill in the pinholes.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Thin Areas: If you find areas with insufficient coverage, apply an additional layer of BaseCoat to achieve the recommended thickness.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Uniformity: Use a roller or brush to smooth out any uneven areas and ensure a uniform coating.
</Text>

{/* FINAL INSPECTION */}
<Text style={[styles.label, { marginBottom: 6 }]}>Final Inspection:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Curing Check: Allow the BaseCoat to dry, typically 20 minutes. Once cured, perform a final inspection to ensure all touch-ups and additional layers have properly adhered.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Complete Coating: Verify that the entire roof surface is completely coated and protected. There should be no visible substrate or inconsistencies in the coating.
</Text>

{/* DOCUMENTATION */}
<Text style={[styles.label, { marginBottom: 6 }]}>Documentation:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Photos: Take photos of the roof before, during, and after the application to document the condition and coverage of the BaseCoat.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Notes: Keep detailed notes on the amount of product used, the area covered, and any issues encountered during the application and inspection process.
</Text>

{/* CIERRE */}
<Text style={[styles.text, { marginTop: 20 }]}>
  By following these steps, you ensure that the RapidRoof BaseCoat is applied correctly, achieving the required coverage rate, and providing a uniform, pinhole-free, and completely coated roof surface. This thorough inspection and correction process helps maintain the integrity and longevity of the roofing system.
</Text>


  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 36 - RapidRoof TopCoat (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

{/* TÍTULO PRINCIPAL */}
<Text style={styles.sectionTitle}>
  {guarantee === '20-year'
    ? 'RapidRoof Pro TopCoat'
    : 'RapidRoof TopCoat'}
</Text>

{/* SUBTÍTULO */}
<Text style={[styles.text, { marginBottom: 10 }]}>
  Guide to Applying RapidRoof TopCoat on a Roof
</Text>

{/* OBJETIVO */}
<Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Apply RapidRoof TopCoat at a coverage rate of {guarantee === '20-year' ? '0.75kg per m²' : '0.5kg per m²'} to ensure a durable and waterproof roof surface.
</Text>

{/* MATERIALES */}
<Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Safety equipment (gloves, goggles, non-slip shoes)</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>RapidRoof TopCoat</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Mixing stick or drill with a mixing attachment</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Measuring tools (scale for measuring TopCoat, tape measure for area calculation)</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Application tools (roller or brush)</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Roller extension pole (for easy application on larger areas)</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Clean cloth or brush</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Ladder or scaffolding (if necessary)</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>Tarpaulin (to protect landscaping and nearby structures)</Text>

{/* PRECAUCIONES */}
<Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Weather Check: Ensure weather conditions are dry and the temperature is between 0°c to 35°c. Avoid working on windy or rainy days.</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes.</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>Electrical Hazards: Be aware of overhead power lines.</Text>


  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 37 - RapidRoof TopCoat (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* PREPARACIÓN */}
<Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Clean the Roof</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Ensure the roof surface is clean, dry, and free from debris, dust, and any loose material. Follow the cleaning steps outlined in previous guides.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Inspect the Roof</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 20 }]}>
  Check for any remaining cracks, splits, or damage that need repair. Ensure all repairs are completed and fully cured before application.
</Text>


  {/* APLICACIÓN */}
<Text style={[styles.label, { marginBottom: 6 }]}>Application of RapidRoof TopCoat:</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>Measure the Area</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 8 }]}>
  Measure the area of the roof to calculate the amount of RapidRoof TopCoat required. At a coverage rate of {guarantee === '20-year' ? '0.75kg' : '0.5kg'} per m², ensure you have sufficient product to cover the entire roof.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>Mix RapidRoof TopCoat</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 8 }]}>
  Thoroughly mix the RapidRoof TopCoat with the RapidRoof Waterproof Catalyst. Use a mixing stick or a drill with a mixing attachment to achieve an even consistency.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>Apply TopCoat</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Using a roller or brush, apply the RapidRoof TopCoat at a coverage rate of {guarantee === '20-year' ? '0.75kg' : '0.5kg'} per m².
</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 8 }]}>
  Work in manageable sections to ensure even coverage and to avoid the product drying out before it is spread properly.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>Ensure Even Coverage</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Apply the TopCoat evenly, making sure to cover all areas thoroughly without leaving gaps or thin spots.
</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 8 }]}>
  Feather the edges to blend the TopCoat smoothly with any surrounding surfaces or layers.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>Inspect and Smooth</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 20 }]}>
  Use the roller or brush to smooth out any bubbles or imperfections. Ensure the surface is even and fully coated.
</Text>

  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

{/* SECADO */}
<Text style={[styles.label, { marginBottom: 6 }]}>Drying and Curing:</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>Allow to Dry</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 8 }]}>
  Allow the RapidRoof TopCoat to dry completely. The drying time will depend on weather conditions.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>Final Inspection</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 20 }]}>
  Perform a final inspection of the applied TopCoat. Ensure there are no visible bubbles, wrinkles, pinholes or uncoated areas.
</Text>

{/* CIERRE */}
<Text style={[styles.label, { marginBottom: 6 }]}>Final Steps:</Text>

<Text style={[styles.text, { marginLeft: 16, marginBottom: 8 }]}>
  Protection: Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 8 }]}>
  Documentation: Take photos before, during, and after the application to document the condition of the roof and the work completed.
</Text>

<Text style={[styles.text, { marginTop: 10 }]}>
  By following these steps, you ensure that the RapidRoof TopCoat is properly applied, creating a durable and waterproof surface that will protect the roof for years to come.
</Text>

<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 38 - RapidRoof Anti-Skid (parte 1/2) */}
{antiSkid === 'Yes' && (
  <>
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

 {/* SECTION TITLE */}
<Text style={styles.sectionTitle}>RapidRoof Anti-Skid</Text>

{/* SUBTITLE */}
<Text style={[styles.text, { marginBottom: 10 }]}>
  Guide to Applying RapidRoof Anti-Skid Coating
</Text>

{/* OBJECTIVE */}
<Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Properly apply RapidRoof Anti-Skid coating at a rate of 1kg per m² over the waterproof layer, and back roll the surface to agitate the aggregate, ensuring a durable and effective anti-skid finish.
</Text>

{/* MATERIALS NEEDED */}
<Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
{[
  'Safety equipment (gloves, goggles, non-slip shoes)',
  'RapidRoof Anti-Skid coating',
  'Mixing stick or drill with a mixing attachment',
  'Measuring tools (scale for measuring product, tape measure for area calculation)',
  'Application tools (roller or brush)',
  'Clean cloth or brush',
  'Ladder or scaffolding (if necessary)',
  'Tarpaulin (to protect landscaping and nearby structures)',
  'Masking tape (for neat edges)'
].map((item, index) => (
  <Text key={index} style={[styles.text, { marginLeft: 16 }]}>• {item}</Text>
))}
<Text style={{ marginBottom: 12 }} />

{/* SAFETY PRECAUTIONS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
{[
  'Wear Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes to protect against splashes and fumes.',
  'Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.',
  'Ventilation: Ensure good ventilation when mixing and applying the product.'
].map((item, index) => (
  <Text key={index} style={[styles.text, { marginLeft: 16 }]}>{`• ${item}`}</Text>
))}
<Text style={{ marginBottom: 12 }} />


  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 39 - RapidRoof Anti-Skid (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* PREPARATION STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Ensure Waterproof Layer is Ready:</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  The waterproof layer should be completely dry. Ensure there are no contaminants on the surface.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Clean the Roof Surface:</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Ensure the roof surface is clean, dry, and free from debris, dust, and any loose material.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Protect Surrounding Areas:</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 12 }]}>
  Use tarpaulins or plastic sheeting to protect landscaping, walls, and other nearby structures from splashes.
</Text>


 {/* APPLICATION STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Application Steps:</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Measure and Prepare Anti-Skid Coating:</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>Calculate Area: Measure the total area to be coated.</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Determine Amount Needed: Calculate the amount of Anti-Skid coating required (1kg per m²).
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Mix Anti-Skid Coating:</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Thoroughly mix the RapidRoof Anti-Skid coating with the Anti-Skid Catalyst. Ensure the aggregate is evenly distributed throughout the coating.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Apply Anti-Skid Coating:</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Apply the Anti-Skid coating at a coverage rate of 1kg per m². Use a roller or brush to spread the coating evenly over the waterproof layer.
</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Ensure the coating is applied uniformly without any missed spots or thin areas.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Back Roll to Agitate Aggregate:</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Before the coating dries, back roll to agitate the aggregate.
</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Lightly roll back over the surface in a crosshatch pattern. This agitation will help to evenly distribute the aggregate and create a consistent anti-skid texture.
</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Ensure the aggregate is evenly distributed and the texture is consistent across the entire surface.
</Text>



  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

{/* FINAL STEPS */}
<Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Final Steps:</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Allow to Cure:</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Allow the Anti-Skid coating to dry completely, typically 20 minutes. Curing time may vary based on environmental conditions.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Inspect the Surface:</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  After curing, inspect the surface to ensure the anti-skid texture is uniform and the aggregate is properly embedded in the coating.
</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Look for any areas that may require touch-up or additional coating.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Clean Up:</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Clean all tools and equipment immediately after use. Dispose of any waste materials according to local regulations.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Document the Application:</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Take photos before, during, and after the application to document the condition of the roof and the work completed.
</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 12 }]}>
  Keep detailed notes on the amount of product used, the area covered, and any issues encountered during the application.
</Text>

<Text style={[styles.text, { marginTop: 20 }]}>
  By following these steps, you ensure that the RapidRoof Anti-Skid coating is applied correctly, providing a durable and effective anti-skid finish that enhances the safety and longevity of the roofing surface.
</Text>

<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

</>
)}

{/* Página 40 - Completed Roof Surface (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

 {/* TÍTULO PRINCIPAL */}
<Text style={styles.sectionTitle}>Completed Roof Surface</Text>

{/* SUBTÍTULO */}
<Text style={[styles.text, { marginBottom: 10 }]}>
  Guide to Visual Inspection of the Completed Roof Surface
</Text>

{/* OBJETIVO */}
<Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  {guarantee === '20-year'
    ? 'Conduct a thorough visual inspection of the completed roof surface to ensure there are no pinholes, the coverage is even, details are correctly applied at 150mm, and Reinforcement Matting is properly installed on all details.'
    : 'Conduct a thorough visual inspection of the completed roof surface to ensure there are no pinholes, the coverage is even, details are correctly applied at 150mm, and all joints, cracks, splits and changes of substrate are reinforced with Joint Tape.'}
</Text>

{/* MATERIALES */}
<Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
{[
  'Safety equipment (gloves, goggles, non-slip shoes)',
  'Flashlight',
  'Measuring tape or ruler',
  'Inspection mirror (optional for hard-to-reach areas)',
  'Notepad and pen (for documentation)',
  'Camera (for photographic documentation)',
  'Ladder or scaffolding (if necessary)',
].map((item, i) => (
  <Text key={i} style={[styles.text, { marginLeft: 16, marginBottom: i === 6 ? 12 : 0 }]}>• {item}</Text>
))}

{/* PRECAUCIONES */}
<Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
{[
  'Wear Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes to protect yourself during the inspection.',
  'Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.',
  'Weather Conditions: Ensure the weather conditions are safe for inspection. Avoid inspecting in wet or windy conditions.',
].map((item, i) => (
  <Text key={i} style={[styles.text, { marginLeft: 16, marginBottom: i === 2 ? 12 : 0 }]}>• {item}</Text>
))}


  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 41 - Completed Roof Surface (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* PASOS DE INSPECCIÓN */}
<Text style={[styles.label, { marginBottom: 6 }]}>Steps for Visual Inspection:</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Initial Overview:</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Walk around the perimeter of the roof to get an initial overview of the surface.
</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Take note of any obvious defects or areas that require closer inspection.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Check for Pinholes:</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Visual Scan: Perform a visual scan of the entire roof surface. Look closely for small holes or gaps in the coating, known as pinholes.
</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Flashlight Method: Use a flashlight to shine light across the surface at a low angle. Pinholes will cast small shadows or appear as bright spots.
</Text>
<Text style={[styles.text, { marginLeft: 32, marginBottom: 6 }]}>
  Detailed Areas: Pay extra attention to seams, edges, and transitions where pinholes are more likely to occur.
</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Ensure Even Coverage:</Text>
<Text style={[styles.text, { marginLeft: 32 }]}>
  Uniform Thickness: Verify that the coating is uniformly thick across the entire roof. There should be no thin spots or exposed substrate.
</Text>

  {/* PASOS DE INSPECCIÓN – CONTINUACIÓN */}
<Text style={styles.textIndent}>Edges and Corners: Check edges, corners, and transitions to ensure they are fully coated and have no exposed areas.</Text>
<Text style={styles.textIndent}>Colour Consistency: Look for colour consistency across the surface, as variations can indicate uneven application.</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Inspect Details at 150mm:</Text>
<Text style={styles.textIndent}>Measure Height: Use a measuring tape to check that details such as terminations, upstands, and other critical points are coated to a minimum height of 150mm.</Text>
<Text style={styles.textIndent}>Detail Work: Ensure all details are properly sealed and the coating is applied consistently at the required height.</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>
  • {guarantee === '20-year' ? 'Verify Reinforcement Matting:' : 'Verify Joint Tape:'}
</Text>
<Text style={styles.textIndent}>
  {guarantee === '20-year'
    ? 'Visible Matting: Inspect areas where reinforcement matting was applied. The matting should be fully embedded in the coating with no exposed edges.'
    : 'Visible Matting: Inspect areas where Joint Tape was applied. The Joint Tape should be fully embedded in the coating with no exposed edges.'}
</Text>
<Text style={styles.textIndent}>
  Coverage: Ensure the {guarantee === '20-year' ? 'matting' : 'Joint Tape'} extends to cover all critical areas, such as joints, seams, and around roof penetrations.
</Text>
<Text style={styles.textIndent}>
  Bonding: Check that the {guarantee === '20-year' ? 'matting' : 'Joint Tape'} is well-bonded to the substrate and there are no air pockets or wrinkles.
</Text>

  <PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

<Text style={[styles.text, { marginLeft: 16 }]}>• Final Checks:</Text>
<Text style={styles.textIndent}>Hard-to-Reach Areas: Use an inspection mirror to check hard-to-reach areas and ensure they are properly coated.</Text>
<Text style={styles.textIndent}>Seams and Joints: Verify that all seams and joints are fully sealed and there are no gaps or openings.</Text>
<Text style={styles.textIndent}>Overall Condition: Assess the overall condition of the roof surface. Ensure it looks uniform and well-maintained.</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Document Findings:</Text>
<Text style={styles.textIndent}>Photographic Evidence: Take photos of the roof surface, especially any areas of concern or interest. Capture before and after images if any touch-up work is required.</Text>
<Text style={styles.textIndent}>Detailed Notes: Write detailed notes on your findings, including any defects, areas that need additional work, and the overall condition of the roof.</Text>

{/* CORRECCIÓN DE DEFECTOS */}
<Text style={[styles.label, { marginBottom: 6, marginTop: 12 }]}>Addressing Issues:</Text>

<Text style={[styles.text, { marginLeft: 16 }]}>• Pinholes: Mark any pinholes with chalk or tape. Prepare a small amount of RapidRoof Pro Detailer and use a brush to fill in the pinholes.</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>• Uneven Coverage: Apply additional coating to any areas with insufficient coverage to achieve uniform thickness.</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>• Detail Adjustments: Correct any issues with details that are not at the required 150mm height. Apply additional coating if necessary.</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • {guarantee === '20-year' ? 'Reinforcement Matting' : 'Joint Tape'}: Ensure any improperly applied {guarantee === '20-year' ? 'matting' : 'Joint Tape'} is corrected by applying additional coating and embedding new material as needed.
</Text>

{/* CIERRE */}
<Text style={[styles.text, { marginTop: 20 }]}>
  By following these steps, you ensure that the completed roof surface is properly inspected for pinholes, even coverage, correct detailing at 150mm, and proper application of {guarantee === '20-year' ? 'Reinforcement Matting' : 'Joint Tape'}. This thorough inspection helps maintain the integrity and longevity of the roofing system.
</Text>

<PdfFooter
  guarantee={guarantee}
  pageNumber={getPageNumber('Waterproof coverings') + waterproofPageIndex++}
/>

</Page>

{/* Página 42 - Schedule of Products (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>Schedule of Products</Text>

{/* PRIMER */}
<Text style={[styles.label, { marginBottom: 6 }]}>
  LRS RapidRoof Primer @ 0.3kg per m²:
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  2-part component primer, comprising of a base component A and an activator component B.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Colour – Clear</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Tin Sizes – 1.5kg, 3kg and 5kg</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Typical Coverage Rates:
  {"\n"}• 1.5kg tin – 5m²
  {"\n"}• 3kg tin – 10m²
  {"\n"}• 5kg tin – 16.6m²
</Text>

{/* BASECOAT */}
<Text style={[styles.label, { marginBottom: 6 }]}>
  LRS RapidRoof Waterproof BaseCoat @ {guarantee === '20-year' ? '1.25kg' : '1kg'} per m²
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  2-part component waterproofing, comprising of a base component A and an activator component B.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Colour – Grey, Anthracite and Black as standard</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Tin Sizes – 7.5kg and 15kg</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Typical Coverage Rates:
  {guarantee === '20-year'
    ? '\n• 5kg tin – 4m²\n• 7.5kg tin – 6m²\n• 15kg tin – 12m²'
    : '\n• 5kg tin – 5m²\n• 7.5kg tin – 7.5m²\n• 15kg tin – 15m²'}
</Text>

{/* REINFORCEMENT / JOINT */}
{guarantee === '20-year' ? (
  <>
    <Text style={[styles.label, { marginBottom: 6 }]}>Reinforcement Matting</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      Used to fully reinforce the RapidRoof BaseCoat.
    </Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>Colour – White</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>Grade – 150gsm chop strand matting</Text>
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
      Roll Sizes – 1m x 25m and 1m x 180m
    </Text>
  </>
) : (
  <>
    <Text style={[styles.label, { marginBottom: 6 }]}>Joint Tape</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      Used to reinforce joints, cracks, splits or changes of substrates.
    </Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>Colour – White</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>Grade – 150gsm chop strand matting</Text>
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
      Roll Sizes – 100mm x 25lm and 100mm x 180lm
    </Text>
  </>
)}


 
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Schedule of products')} />
</Page>

{/* Página 43 - Schedule of Products (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* TOPCOAT */}
<Text style={[styles.label, { marginBottom: 6 }]}>
  LRS RapidRoof Waterproof TopCoat @ {guarantee === '20-year' ? '0.75kg' : '0.5kg'} per m²
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  2-part component waterproofing, comprising of a base component A and an activator component B.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Colour – Grey, Anthracite and Black as standard</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Tin Sizes – 7.5kg and 15kg</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Typical Coverage Rates:
  {guarantee === '20-year'
    ? '\n• 5kg tin – 6.6m²\n• 7.5kg tin – 10m²\n• 15kg tin – 20m²'
    : '\n• 5kg tin – 10m²\n• 7.5kg tin – 15m²\n• 15kg tin – 30m²'}
</Text>

{/* ANTI-SKID */}
<Text style={[styles.label, { marginBottom: 6 }]}>LRS RapidRoof Anti-Skid @ 1kg per m²</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  2-part component, comprising of a base component A and an activator component B.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Colour – Grey and Black as standard</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>Tin Sizes – 5kg and 10kg</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Typical Coverage Rates:
  {"\n"}• 5kg tin – 5m²
  {"\n"}• 10kg tin – 10m²
</Text>

  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Schedule of products') + 1} />
</Page>

{/* Página 44 - Additional Information (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>Additional Information</Text>

{/* PRIMERS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Primers:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Application: Apply with brush or short piled roller at the correct coverage rates as it states above.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Storage Temperatures: LRS RapidRoof Primer must be stored between 5°C and 20°C at all times and kept out of direct sunlight.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Application Temperatures: Check the ambient and substrate temperatures prior to application. Minimum surface temperature: +0°C, maximum: 35°C.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • RapidRoof Primer needs to be dry before overcoating with RapidRoof BaseCoat.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Typical drying time at 15°C: 20 minutes.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  • If left more than 14 days, surfaces will need to be re-primed.
</Text>

{/* BASECOAT / TOPCOAT */}
<Text style={[styles.label, { marginBottom: 6 }]}>RapidRoof Pro BaseCoat / TopCoat:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Application: Apply with brush or short piled roller at the correct coverage rates as stated above.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Storage Temperatures: LRS RapidRoof must be stored between 5°C and 20°C at all times and kept out of direct sunlight.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Application Temperatures: Minimum surface temperature: +0°C, maximum: 35°C.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • BaseCoat must be dry before overcoating with TopCoat.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Typical drying time at 15°C: 20 minutes.
</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  • If left more than 14 days, surfaces will need to be re-primed using LRS RapidRoof Primer.
</Text>

{/* ANTI-SKID */}
<Text style={[styles.label, { marginBottom: 6 }]}>RapidRoof Anti-Skid:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Application: Apply with brush or short piled roller at the correct coverage rates as stated above.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Storage Temperatures: Must be stored between 5°C and 20°C and kept out of direct sunlight.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Application Temperatures: Minimum surface temperature: +0°C, maximum: 35°C.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Ensure TopCoat is dry before applying RapidRoof Anti-Skid.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  • Typical drying time at 15°C: 20 minutes.
</Text>


  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Additional information')} />
</Page>



{/* Página 46 - General Guidance and Requirements (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>General Guidance and Requirements</Text>

{/* Drying Out – Equipment */}
<Text style={[styles.label, { marginBottom: 6 }]}>Drying Out – Equipment:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  These are readily available commercially from local tool plant hire companies:
</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Leaf Blowers</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Hot Air Blower</Text>
<Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Roof Pumps</Text>

{/* Defects */}
<Text style={[styles.label, { marginBottom: 6 }]}>Defects:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  This specification provided by LRS is written on the basis that the substrate, roof deck and structures are sound and suitable. We cannot accept responsibility for the consequences of defects in the roof deck or structure.
</Text>

{/* Installation */}
<Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Installation:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  All LRS Waterproofing Systems are to be installed in accordance with this specification.
</Text>

{/* Building Works */}
<Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Building Works:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  It is the contractor’s responsibility to ensure suitable protection of semi-completed or completed works.
</Text>

{/* Protection of Works */}
<Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Protection of Works:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  The contractor must ensure that any plant, equipment, or materials placed onto the waterproofing membrane are protected if other trades require access across the surface during or after completion of works.
</Text>

{/* Safe Working */}
<Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Safe Working:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  All works are to be carried out in accordance with the current Health and Safety Legislation.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Available at https://www.hse.gov.uk/legislation/index.htm
</Text>


  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('General guidance and requirements')} />
</Page>

{/* Página 47 - General Guidance and Requirements (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* Inclement Weather */}
<Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Inclement Weather Protection:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  If rain is forecast, no LRS Waterproofing coatings should be installed. The contractor must ensure that, at the end of each day, any exposed membranes or substrates that are susceptible to damage through water ingress are sealed and protected to ensure complete water tightness.
</Text>

{/* Maintenance After Installation */}
<Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Maintenance After Installation:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  The new roof coverings should be managed in accordance with the recommendations of BS6229:2003 with regards to ongoing maintenance.
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  They should be routinely inspected and cleared of any debris every spring and autumn. This will need to be undertaken more often if the roof is surrounded by trees etc. Please note that failure to follow maintenance guidelines can invalidate the product guarantee.
</Text>

{/* Delays */}
<Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Delays:</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  All or general areas: Overcoating must be carried out within 14 days of the application of the preceding coat (primer or waterproofing).
</Text>
<Text style={[styles.text, { marginLeft: 16 }]}>
  Coatings that are over 14 days will need to be re-primed using LRS RapidRoof Primer at a coverage rate of 0.3kg per m². This should be applied using a brush or short piled roller.
</Text>


  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('General guidance and requirements') + 1} />
</Page>

{/* Página 48 - Safety Advice for Using RapidRoof PMMA (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>Safety Advice for Using RapidRoof PMMA</Text>

{/* Objective */}
<Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
<Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
  Ensure safe handling, application, and storage of RapidRoof PMMA (polymethyl methacrylate) roofing products to prevent accidents and health hazards.
</Text>

{/* Safety Precautions */}
<Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>

<Text style={[styles.label, { marginLeft: 16, marginBottom: 6 }]}>Personal Protective Equipment (PPE):</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Gloves: Wear chemical-resistant gloves to protect your hands from exposure to PMMA.</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Goggles: Use safety goggles to protect your eyes from splashes.</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Respirator: Use a respirator with organic vapor cartridges if working in poorly ventilated areas to avoid inhaling fumes.</Text>
<Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Clothing: Wear long sleeves, long trousers, and closed-toe shoes to minimize skin exposure.</Text>

<Text style={[styles.label, { marginLeft: 16, marginBottom: 6 }]}>Ventilation:</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Work Outdoors: Whenever possible, apply PMMA products outdoors or in well-ventilated areas.</Text>
<Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Indoor Application: Use fans or other ventilation systems to ensure adequate airflow when working indoors.</Text>

<Text style={[styles.label, { marginLeft: 16, marginBottom: 6 }]}>Handling and Storage:</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Storage: Store PMMA products in a cool, dry place away from direct sunlight and sources of ignition. Keep containers tightly closed when not in use. Keep inside between 5°c to 20°c.</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Handling: Avoid spilling or splashing. Handle containers with care to prevent leaks and spills.</Text>
<Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Fire Safety: PMMA products are flammable. Keep away from open flames, sparks, and other sources of ignition. Have fire extinguishing equipment readily available.</Text>

  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Safety Advice for Usinf RapidRoof PMMA')} />
</Page>

{/* Página 49 - Safety Advice for Using RapidRoof PMMA (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={[styles.label, { marginLeft: 16, marginBottom: 6 }]}>Mixing and Application:</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Mixing: Follow LRS instructions for mixing PMMA products. Avoid creating dust or aerosols during mixing.</Text>
<Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Application Tools: Use appropriate tools such as rollers and brushes. Clean tools thoroughly after use.</Text>


  <Text style={[styles.label, { marginBottom: 6 }]}>First Aid Measures:</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Inhalation: Move to fresh air immediately if you experience dizziness, headaches, or difficulty breathing. Seek medical attention if symptoms persist.</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Skin Contact: Wash exposed skin thoroughly with soap and water. Remove contaminated clothing and wash before reuse. Seek medical attention if irritation persists.</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Eye Contact: Rinse eyes immediately with plenty of water for at least 15 minutes. Seek medical attention if irritation persists.</Text>
<Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Ingestion: Do not induce vomiting. Rinse mouth thoroughly and seek medical attention immediately.</Text>

<Text style={[styles.label, { marginBottom: 6 }]}>Environmental Protection:</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Spill Containment: In case of a spill, contain and collect the material using inert absorbents (e.g., sand or vermiculite). Dispose of in accordance with local regulations.</Text>
<Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Waste Disposal: Dispose of unused PMMA products and contaminated materials according to local environmental regulations. Do not pour into drains or waterways.</Text>

<Text style={[styles.label, { marginBottom: 6 }]}>Emergency Procedures:</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Fire: Use carbon dioxide, dry chemical, or foam extinguishers to combat small fires involving PMMA products. Do not use water jet as it may spread the fire.</Text>
<Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Spill Response: Evacuate the area and ventilate. Use personal protective equipment during clean-up. Contain the spill and dispose of the waste properly.</Text>

  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Safety Advice for Usinf RapidRoof PMMA') + 1} />
</Page>

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

<Text style={[styles.label, { marginBottom: 6 }]}>Best Practices:</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Training: Ensure all personnel handling PMMA products are trained on proper use, potential hazards, and emergency procedures.</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Labelling: Clearly label all PMMA containers with the product name, hazard warnings, and safety instructions.</Text>
<Text style={[styles.text, { marginLeft: 24 }]}>• Monitoring: Regularly monitor air quality in the work area to ensure ventilation systems are effective in reducing airborne concentrations of hazardous substances.</Text>
<Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Documentation: Keep Material Safety Data Sheets (MSDS) for PMMA products accessible to all personnel. Review and understand the information provided in the MSDS.</Text>

<Text style={[styles.text, { marginTop: 20 }]}>
  By following these safety guidelines, you can minimize the risk of accidents and health hazards when using RapidRoof PMMA products. Ensuring proper handling, storage, and personal protection will help maintain a safe working environment.
</Text>
<PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Safety Advice for Usinf RapidRoof PMMA') + 2} />
</Page>

{/* Página 50 - Photographic Evidence */}
{photos?.length > 0 && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <Text style={styles.sectionTitle}>Photographic Evidence</Text>
<Text style={[styles.text, { marginBottom: 12 }]}>
  Photographs provided for reference during or after installation process.
</Text>


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

{/* Página 51 - Guarantee */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <View style={{ marginTop: 40 }}>
  <Text style={styles.sectionTitle}>Guarantee</Text>

  <Text style={[styles.text, { marginBottom: 12 }]}>
    Materials only. The following guaranteed specification is covered by LRS product
    guarantee for the period of {guarantee === '20-year' ? '20-years' : '10-years'} from the date of practical completion.
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


  <PdfFooter guarantee={guarantee} pageNumber={getPageNumber('Guarantee')} />
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
        LIQUID ROOFING SYSTEMS
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
      src="https://i.postimg.cc/WhWy9YdP/lrs-1.png"
      style={{ width: 110, marginTop: 6 }}
    />
  </View>
</Page>



    </Document>
  );
};

export default PdfDocument;
