import React from "react"
import { BlitzPage, useQuery } from "blitz"
import GameLayout from "../../layout"
import { useRecoilState } from "recoil"
import { FaArrowLeft } from "react-icons/fa"
import Link from "next/link"
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdSearch,
  MdStar,
  MdStarBorder,
} from "react-icons/md"
import { Colors } from "../../constants"
import { RevolvingDot } from "react-loader-spinner"
import getOfficialCategories from "../../queries/officialCategories/getOfficialCategories"
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import { SSelectedOfficialWords } from "../../utils/store"
import getMyCategories from "../../queries/customCategories/getMyCategories"
import getPublicCategories from "../../queries/customCategories/getPublicCategories"
import getSharedCategories from "../../queries/customCategories/getSharedCategories"

const SearchInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({
  onChange,
  value,
}) => {
  return (
    <div className="container">
      <MdSearch size={32} />
      <input
        placeholder="검색어를 입력해 주세요..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <style jsx>{`
        .container {
          flex-grow: 1;
          height: 60px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.2);
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 20px;
        }
        input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 24px;
          font-weight: 800;
          flex-grow: 1;
          height: 100%;
        }
        input::placeholder {
          color: #000;
        }
      `}</style>
    </div>
  )
}

const ItemCard: React.FC<{
  item: { name: string; id: number; description: string; difficulty: number }
  tab: TabType
}> = ({ item, tab }) => {
  const [official, setOfficial] = useRecoilState(SSelectedOfficialWords)

  const selected = React.useMemo(() => {
    if (tab === TabType.OFFICIAL) {
      return official.includes(item.id)
    }
    return false
  }, [tab, official, item.id])

  return (
    <div
      style={{
        background: selected ? Colors.blue : "#7DDDC0",
        padding: 20,
        borderRadius: 20,
        cursor: "pointer",
        transition: "all ease .2s",
      }}
      onClick={() => {
        if (tab === TabType.OFFICIAL) {
          if (selected) {
            setOfficial(official.filter((x) => x !== item.id))
          } else {
            setOfficial([...official, item.id])
          }
        }
      }}
    >
      <div style={{ background: "#7DDDC0", borderRadius: 10, padding: 20, height: "100%" }}>
        <div style={{ fontSize: 32, fontWeight: 800 }}>{item.name}</div>
        <div style={{ display: "flex" }}>
          {new Array(item.difficulty).fill(0).map((x, i) => (
            <MdStar size={28} key={i} />
          ))}
          {new Array(10 - item.difficulty).fill(0).map((x, i) => (
            <MdStarBorder size={28} key={i} />
          ))}
        </div>
        <div style={{ fontSize: 24 }}>{item.description}</div>
      </div>
    </div>
  )
}

const CategoryList: React.FC<{ query: string; tab: TabType }> = ({ query, tab }) => {
  const queryToRun = React.useMemo(() => {
    switch (tab) {
      case TabType.OFFICIAL:
        return getOfficialCategories
      case TabType.ME:
        return getMyCategories
      case TabType.PUBLIC:
        return getPublicCategories
      case TabType.SHARED:
        return getSharedCategories
    }
    return getOfficialCategories
  }, [tab])

  const [currentPage, setCurrentPage] = React.useState(0)

  const [{ categories, count }] = useQuery(queryToRun, { query, page: currentPage })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {categories.length && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: 20,
              flexGrow: 1,
              height: 0,
            }}
          >
            {categories.map((x, i) => (
              <ItemCard tab={tab} item={x} key={i} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 12,
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                if (currentPage === 0) return
                setCurrentPage(() => currentPage - 1)
              }}
            >
              <MdChevronLeft size={32} />
            </div>
            <div style={{ fontSize: 24 }}>
              {currentPage + 1} / {Math.ceil(count / 6)}
            </div>
            <div
              style={{
                width: 48,
                height: 48,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                if (currentPage === Math.ceil(count / 6) - 1) return
                setCurrentPage(() => currentPage + 1)
              }}
            >
              <MdChevronRight size={32} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export enum TabType {
  OFFICIAL,
  ME,
  PUBLIC,
  SHARED,
}

const TabItem: React.FC<{ active: boolean; onClick: () => void }> = ({
  children,
  onClick,
  active,
}) => {
  return (
    <div
      style={{ fontSize: 24, position: "relative", height: 48, fontWeight: 800, cursor: "pointer" }}
      onClick={onClick}
    >
      <div style={{ paddingLeft: 12, paddingRight: 12 }}>{children}</div>
      {active && (
        <motion.div
          layoutId="tabIndicator"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          style={{
            width: "100%",
            borderRadius: 3,
            height: 6,
            background: Colors.blue,
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        />
      )}
    </div>
  )
}

const SelectCategory: BlitzPage = () => {
  const [query, setQuery] = React.useState("")
  const [selectedTab, setSelectedTab] = React.useState<TabType>(TabType.OFFICIAL)

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div>
        <Link href={"/game"} passHref>
          <a
            style={{
              fontSize: 24,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              color: "#000",
            }}
          >
            <FaArrowLeft />
            <div>돌아가기</div>
          </a>
        </Link>
      </div>
      <div style={{ fontSize: 64, fontWeight: 800, textAlign: "center", marginTop: 12 }}>
        주제 선택
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          paddingTop: 12,
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ width: "100%" }}>
          <AnimateSharedLayout>
            <AnimatePresence>
              <div style={{ display: "flex", gap: 24 }}>
                <TabItem
                  onClick={() => setSelectedTab(TabType.OFFICIAL)}
                  active={selectedTab === TabType.OFFICIAL}
                >
                  공식 주제
                </TabItem>
                <TabItem
                  onClick={() => setSelectedTab(TabType.ME)}
                  active={selectedTab === TabType.ME}
                >
                  내가 만든 주제
                </TabItem>
                <TabItem
                  onClick={() => setSelectedTab(TabType.PUBLIC)}
                  active={selectedTab === TabType.PUBLIC}
                >
                  공개된 주제
                </TabItem>
                <TabItem
                  onClick={() => setSelectedTab(TabType.SHARED)}
                  active={selectedTab === TabType.SHARED}
                >
                  공유받은 주제
                </TabItem>
              </div>
            </AnimatePresence>
          </AnimateSharedLayout>
        </div>
        <div style={{ display: "flex", width: "100%", gap: 12 }}>
          <SearchInput value={query} onChange={(value) => setQuery(value)} />
          {selectedTab === TabType.ME && (
            <div
              style={{
                width: 60,
                height: 60,
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <MdAdd size={48} />
            </div>
          )}
        </div>
        <div style={{ flexGrow: 1, width: "100%", marginTop: 10, height: 0 }}>
          <React.Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <RevolvingDot width={160} height={160} color="#fff" />
              </div>
            }
          >
            <CategoryList tab={selectedTab} query={query} />
          </React.Suspense>
        </div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>
          원하는 주제가 없나요?{" "}
          <a
            style={{ color: Colors.blue }}
            href="https://forms.gle/KcNTRyAhbYWZf69P9"
            target="_blank"
            rel="noreferrer"
          >
            여기
          </a>
          에서 주제 추가를 요청해 보세요.
        </div>
      </div>
    </div>
  )
}

SelectCategory.getLayout = (component) => <GameLayout>{component}</GameLayout>

export default SelectCategory
